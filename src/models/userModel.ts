export interface User {
  userId: number;
  name: string;
  email: string;
  mobileNumber: string;
  roleId: number;
  totalExperience: number;
  departmentName: string;
  gender: string;
  Salutation: string;
  collegeName: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankName: string;
  bankBranchName: string;
  bankIFSCCode: string;
  isEnabled: boolean;
  userCourses: any[]; // Assuming empty array
  userAreaOfSpecializations: UserAreaOfSpecialization[];
  userQualifications: UserQualification[];
  userDesignations: any[]; // Assuming empty array
  isActive: boolean;
  createdById: number;
  createdDate: string;
  modifiedById: number;
  modifiedDate: string;
}

export interface UserCourse {
  userCourseId: number;
  userId: number;
  courseName: string;
  degreeTypeId: number;
  numberOfYearsHandled: number;
  isHandledInLast2Semester: boolean;
  isActive: boolean;
  createdById: number;
  createdDate: string; 
  modifiedById: number;
  modifiedDate: string; 
}

export interface UserAreaOfSpecialization {
  userAreaOfSpecializationId: number;
  userId: number;
  areaOfSpecializationName: string;
  isActive: boolean;
  createdById: number;
  createdDate: string; 
   modifiedById: number;
  modifiedDate: string; 
}

export interface UserQualification {
  userQualificationId: number;
  userId: number;
  title: string;          
  name: string;           
  specialization: string; 
  isCompleted: boolean;
  isActive: boolean;
  createdById: number;
  createdDate: string; 
  modifiedById: number;
  modifiedDate: string;
}

export interface UserDesignation {
  userDesignationId: number;
  designationId: number;
  userId: number;
  experience: number;
  isCurrent: boolean;
  collegeName: string;
  departmentName: string;
  isActive: boolean;
  createdById: number;
  createdDate: string;  
  modifiedById: number;
  modifiedDate: string; 
}
