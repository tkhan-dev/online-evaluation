import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import arrowLeft from "../../../assets/arrow-Left.svg";
import {
  mobileNumberValidationSchema,
  nameValidationSchema,
  emailValidationSchema,
} from "../../../utils/Error";
import FormField from "../../../base-components/FormField";
import userService from "../../../services/userService";
import { useSpinner } from "../../../base-components/SpinnerContext";
import { UserProfile } from "../../../models/userProfileModel";
import Button from "../../../base-components/Button";
import "../../../font.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";


const basePersonSchema = yup.object().shape({
  salutation: yup.string().required(),
  fullName: nameValidationSchema({
    fieldName: "Name",
    required: true,
    minLength: 3,
  }),
  gender: yup.string().required("Gender is required."),
  mobile: mobileNumberValidationSchema({
    value: "Mobile number",
    required: true,
  }),
  emailId: emailValidationSchema({
    fieldName: "emailId",
    required: false,
  }),
  collegeName: yup.string().required("College is required."),
  department: yup.string().required("Department is required."),
});

const UserPersonalInfo: React.FC = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { showSpinner, hideSpinner } = useSpinner();

  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isDesignationModalOpen, setIsDesignationModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isSpecializationModalOpen, setIsSpecializationModalOpen] = useState(false);
  

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(basePersonSchema),
  });


  const fetchUserDetails = async (userId: string) => {
    showSpinner();
    try {
      const data: UserProfile = await userService.getUser(userId);
      setUserData(data);

      setValue("salutation", data.salutation || "");
      setValue("fullName", data.name || "");
      setValue("gender", data.gender || "");
      setValue("mobile", data.mobileNumber || "");
      setValue("emailId", data.email || "");
      setValue("collegeName", data.collegeName || "");
      setValue("department", data.departmentName || "");
      // setValue("bankAccountName", data.bankAccountName || "");
    } catch {
      message.error("Failed to load user details");
    } finally {
      hideSpinner();
    }
  };
useEffect(() => {
  if (userId) {
    fetchUserDetails(userId);
  }
}, [userId]);
  const onSubmit = async (formData: any) => {
    if (!userId || !userData) return;
    showSpinner();
    setIsSubmitting(true);
    try {
      const updatedUser: UserProfile = {
        ...userData,
        salutation: formData.salutation,
        name: formData.fullName,
        gender: formData.gender,
        mobileNumber: formData.mobile,
        email: formData.emailId,
        collegeName: formData.collegeName,
        departmentName: formData.department,
        modifiedDate: new Date().toISOString(),
      };
      await userService.updateUser(userId, updatedUser);
      message.success("User updated successfully!");
      navigate(-1);
    } catch (error: any) {
      message.error(error.response?.data?.message || "Failed to update user");
    } finally {
      setIsSubmitting(false);
      hideSpinner();
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3 md:gap-5 items-center">
          <img
            className="cursor-pointer w-5 h-5 md:w-6 md:h-6"
            src={arrowLeft}
            onClick={() => navigate("/user-management")}

            alt="Back"
          />
          <h1 className="h1">Personal Information</h1>
        </div>
      </div>
      <hr className="border-gray-300 mb-4" />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            label="Salutation"
            name="salutation"
            register={register}
            control={control}
            error={errors.salutation?.message}
            type="select"
            isRequired
            placeholder="Select salutation"
          />
          <FormField
            label="Name"
            name="fullName"
            register={register}
            control={control}
            error={errors.fullName?.message}
            type="input"
            inputType="text"
            isRequired
            placeholder="Enter name"
          />
          <FormField
            label="Gender"
            name="gender"
            control={control}
            error={errors.gender?.message}
            type="select"
            isRequired
            placeholder="Select gender"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Mobile number"
            name="mobile"
            register={register}
            control={control}
            error={errors.mobile?.message}
            type="mobile"
            isRequired
            placeholder="Enter mobile number"
          />
          <FormField
            label="Email id"
            name="emailId"
            register={register}
            error={errors.emailId?.message}
            type="input"
            inputType="email"
            isRequired
            placeholder="Enter email"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="College Name"
            name="collegeName"
            register={register}
            error={errors.collegeName?.message}
            type="select"
            control={control}
            placeholder="Select college"
          />
          <FormField
            label="Department"
            name="department"
            error={errors.department?.message}
            type="select"
            control={control}
            register={register}
            placeholder="Select department"
          />
        </div>

        <div className="flex justify-between items-center mb-2 mt-6">
          <h3 className="h3">Designation and Experience</h3>
          <button
            type="button"
            className="px-4 py-2 bg-blue-300 text-light-primary-color rounded-full"
            onClick={() => setIsDesignationModalOpen(true)}
          >
            Add Designation
          </button>
        </div>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Designation</strong></TableCell>
                <TableCell><strong>Department</strong></TableCell>
                <TableCell><strong>College Name</strong></TableCell>
                <TableCell><strong>Experience</strong></TableCell>
                <TableCell><strong>Current Position</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData?.userDesignations?.map((d, idx) => (
                <TableRow key={idx}>
                  <TableCell>{d.designationId}</TableCell>
                  <TableCell>{d.departmentName}</TableCell>
                  <TableCell>{d.collegeName}</TableCell>
                  <TableCell>{d.experience}</TableCell>
                  <TableCell>{d.isCurrent ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button appearance="text">Edit</Button>|
                      <Button appearance="text">Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {isDesignationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black bg-opacity-40"
              onClick={() => setIsDesignationModalOpen(false)}
            ></div>

            {/* Modal Box */}
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10">
              <h2 className="text-lg font-semibold mb-4">Add Designation</h2>
              <FormField
                label="Designation"
                name="designation"
                register={register}
                control={control}
                type="select"
                isRequired
                placeholder="Select Designation"
              />
              <FormField
                label="Department"
                name="department"
                register={register}
                control={control}
                type="select"
                isRequired
                placeholder="Select Department"
              />
              <FormField
                label="College"
                name="college"
                register={register}
                control={control}
                type="select"
                isRequired
                placeholder="Select College"
              />
              <FormField
                label="Expirience"
                name="expirience"
                register={register}
                control={control}
                type="input"
                inputType="number"
                isRequired
                placeholder="Enter expirience"
              />
              <FormField
                label="Current position"
                name="college"
                register={register}
                control={control}
                type="select"
                isRequired
                placeholder="select"
              />
              <div className="flex items-center gap-4">
                <Button appearance="primary">Save</Button>
                <Button
                  appearance="secondary"
                  onClick={() => setIsDesignationModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mb-2 mt-6">
          <h3 className="h3">Courses Handled</h3>
          <button
            type="button"
            className="px-4 py-2 bg-blue-300 text-light-primary-color rounded-full"
            onClick={() => setIsCourseModalOpen(true)}
          >
            Add Course
          </button>
        </div>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Course Name</strong></TableCell>
                <TableCell><strong>Degree Type</strong></TableCell>
                <TableCell><strong>No. of Semesters</strong></TableCell>
                <TableCell><strong>Handled in Last 2 Semesters?</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData?.userCourses?.map((c, idx) => (
                <TableRow key={idx}>
                  <TableCell>{c.courseName}</TableCell>
                  <TableCell>{c.degreeTypeId}</TableCell>
                  <TableCell>{c.numberOfYearsHandled}</TableCell>
                  <TableCell>{c.isHandledInLast2Semester ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button appearance="text">Edit</Button>|
                      <Button appearance="text">Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
{isCourseModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black bg-opacity-40"
              onClick={() => setIsCourseModalOpen(false)}
            ></div>

            {/* Modal Box */}
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10">
              <h2 className="text-lg font-semibold mb-4">Add Course</h2>
              <FormField
                label="Course Name"
                name="courseName"
                register={register}
                control={control}
                type="input"
                isRequired
                placeholder="enter course name"
              />
              <FormField
                label="Degree Type"
                name="degreeType"
                register={register}
                control={control}
                type="select"
                isRequired
                placeholder="select degree type"
              />
              <FormField
                label="No. of Semesters Handled"
                name="noOfSemesterHandled"
                register={register}
                control={control}
                type="input"
                isRequired
                inputType="number"
                placeholder="enter no. of semesters handled"
              />
              <FormField
                label="Handled in Last 2 Semesters?"
                name="handledInLastTwoSem"
                register={register}
                control={control}
                type="select"
                isRequired
                placeholder="select an option "
              />
              <FormField
                label="Current position"
                name="currentPosition"
                register={register}
                control={control}
                type="select"
                isRequired
                placeholder="select an option"
              />
              <div className="flex items-center gap-4">
                <Button appearance="primary">Save</Button>
                <Button
                  appearance="secondary"
                  onClick={() => setIsCourseModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mb-2 mt-6">
          <h3 className="h3">Area of Specialization</h3>
          <button
            type="button"
            className="px-4 py-2 bg-blue-300 text-light-primary-color rounded-full"
            onClick={() => setIsSpecializationModalOpen(true)}
          >
            Add Specialization
          </button>
        </div>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Area of Specialization</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData?.userAreaOfSpecializations?.map((s, idx) => (
                <TableRow key={idx}>
                  <TableCell>{s.areaOfSpecializationName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button appearance="text">Edit</Button>|
                      <Button appearance="text">Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
{isSpecializationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black bg-opacity-40"
              onClick={() => setIsSpecializationModalOpen(false)}
            ></div>

            {/* Modal Box */}
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10">
              <h2 className="text-lg font-semibold mb-4">Add Area of Specialization</h2>
              <FormField
                label="Area of Specialization"
                name="areaOfSpecialization"
                register={register}
                control={control}
                type="input"
                isRequired
                placeholder="Enter the area of specialization"
              />
              <div className="flex items-center gap-4">
                <Button appearance="primary">Save</Button>
                <Button
                  appearance="secondary"
                  onClick={() => setIsSpecializationModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mb-2 mt-6">

          <h3 className="h3">Bank Details</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            label="Bank Account Name"
            name="bankAccountName"
            register={register}
            control={control}
            error={errors.salutation?.message}
            type="input"
            isRequired
            placeholder="Enter name"
          />
          <FormField
            label="Bank Account Number"
            name="bankAccountNumber"
            register={register}
            control={control}
            type="input"
            isRequired
            placeholder="Enter account number"
          />
          <FormField
            label="Bank Name"
            name="bankName"
            register={register}
            control={control}
            type="input"
            isRequired
            placeholder="Enter bank name"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            label="Bank Branch Name"
            name="bankBranchname"
            register={register}
            control={control}
            type="input"
            isRequired
            placeholder="Enter bank branch name"
          />
          <FormField
            label="Bank IFSC Code"
            name="bankIFSCCode"
            register={register}
            control={control}
            type="input"
            isRequired
            placeholder="Enter bank ifsc code"
          />
          </div>
        
        <div className="flex gap-x-4 mt-6">
          <Button type="submit" appearance="primary" disabled={isSubmitting}>
            Submit
          </Button>
          <Button
            type="button"
            appearance="outlined"
            onClick={() => navigate("../user-management")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default UserPersonalInfo;
