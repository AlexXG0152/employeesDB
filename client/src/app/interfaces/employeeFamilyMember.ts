export interface IEmployeeFamilyMember {
  employeeID: number;
  familyMemberType: number;
  familyMemberName: string;
  familyMemberBirthDate: string;
  familyMemberDateEnd: string;
  familyMemberDateStart: string;
  _id: string;
  updatedAt?: string;
  createdAt?: string;
  selected?: boolean;
  editable?: boolean;
}
