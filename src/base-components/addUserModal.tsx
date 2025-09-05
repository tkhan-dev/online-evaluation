import React, { useEffect, useState } from "react";
import Button from "./Button";
import FormField from "./FormField";
import userService from "../services/userService";
import { message } from "antd";
import { useSpinner } from "./SpinnerContext";
import * as yup from "yup";
import {
  nameValidationSchema,
  mobileNumberValidationSchema,
  emailValidationSchema,
} from "../utils/Error";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

interface CreateUserModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedUser: any;
  setSelectedUser: (user: any) => void;
  isEditMode?: boolean;
  onSuccess?: () => void;
}

const basePersonSchema = yup.object().shape({
  fullName: nameValidationSchema({
    fieldName: "Name",
    required: true,
    minLength: 3,
  }),
  mobile: mobileNumberValidationSchema({
    value: "Mobile number",
    required: true,
  }),
  emailId: emailValidationSchema({
    fieldName: "emailId",
    required: false,
  }),
});

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  open,
  setOpen,
  selectedUser,
  setSelectedUser,
  isEditMode = false,
  onSuccess,
}) => {
  const { showSpinner, hideSpinner } = useSpinner();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(basePersonSchema),
    defaultValues: {
      fullName: "",
      emailId: "",
      mobile: "",
    },
  });

  // Reset form values when modal opens (edit/create)
  useEffect(() => {
    if (open) {
      reset({
        fullName: selectedUser?.name || "",
        emailId: selectedUser?.email || "",
        mobile: selectedUser?.mobileNumber || "",
      });
    }
  }, [open, selectedUser, reset]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    showSpinner();

    try {
      if (isEditMode) {
        await userService.updateUser(selectedUser.id.toString(), {
          ...selectedUser,
          name: data.fullName,
          email: data.emailId,
          mobileNumber: data.mobile.toString(),
        });
        message.success("User updated successfully!");
      } else {
        const userObj = {
          userId: 0,
          gender: "",
          salutation: "",
          name: data.fullName,
          email: data.emailId,
          mobileNumber: data.mobile.toString(),
          departmentName: "",
          collegeName: "",
          roleId: 2,
          mode: "",
          totalExperience: 0,
          bankAccountName: "",
          bankName: "",
          bankAccountNumber: "",
          bankBranchName: "",
          bankIFSCCode: "",
          isEnabled: true,
          userCourses: [],
          userAreaOfSpecializations: [],
          userQualifications: [],
          userDesignations: [],
          isActive: true,
          createdById: 1,
          createdDate: new Date().toISOString(),
          modifiedById: 1,
          modifiedDate: "",
        };
        await userService.addUser(userObj);
        message.success("User added successfully!");
      }

      setOpen(false);
      setSelectedUser({});
      if (onSuccess) onSuccess();
    } catch (error: any) {
      message.error(error.response?.data?.message || "Failed to save user");
    } finally {
      hideSpinner();
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => setOpen(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg z-20 w-full max-w-xl mx-auto mt-24 shadow-xl">
        {/* Header */}
        <div className="bg-[#E9ECFA] py-6 px-6 rounded-t-lg border-b border-gray-200">
          <h2 className="text-xl font-semibold">
            {isEditMode ? "Edit User" : "Create User"}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Enter the required details.
          </p>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5 bg-background-color">
          <FormField
            name="fullName"
            label="Name"
            type="input"
            hasBorder
            placeholder="Enter name"
            error={errors.fullName?.message}
            register={register}
            control={control}
            isRequired
          />
          <FormField
            name="emailId"
            label="Email"
            type="input"
            inputType="email"
            hasBorder
            register={register}
            control={control}
            error={errors.emailId?.message}
            placeholder="Enter email"
            isRequired
          />
          <FormField
            name="mobile"
            label="Mobile Number"
            type="mobile"
            register={register}
            control={control}
            hasBorder
            error={errors.mobile?.message}
            placeholder="Enter mobile no."
            isRequired
          />

          {/* Footer */}
          <div className="flex gap-x-3 border-t border-gray-200 pt-4">
            <Button
              className="w-full"
              onClick={() => setOpen(false)}
              appearance="outlined"
              type="button"
            >
              Cancel
            </Button>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              appearance="primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isEditMode ? "Update User" : "Create User"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
