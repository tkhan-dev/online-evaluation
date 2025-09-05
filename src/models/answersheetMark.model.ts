export interface AnswersheetMark {
  answersheetId: number;
  questionPartName: string;
  questionGroupName: string;
  questionNumber: number;
  questionNumberSubNum: number;
  maximumMark: number;
  obtainedMark: number;
  createdById: number;
  modifiedById: number;
}

export interface AnswersheetAllocateInputModel {
  examYear: string;
  examMonth: string;
  examType: string;
  courseId: number;
  userId: number;
  noofsheets: number;
  examCategoryId: number;
  examBatchId: number;
}