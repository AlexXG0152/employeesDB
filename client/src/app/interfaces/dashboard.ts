export interface IHiredInYear {
  employeeID: Number;
  employmentDate: string;
  fatherName: string;
  firstName: string;
  lastName: string;
  _id: string;
}

export interface IFiredInYear {
  employeeID: Number;
  dismissalDate: string;
  dismissalReason: string;
  fatherName: string;
  firstName: string;
  lastName: string;
  _id: string;
}

export interface ITodayBirthdays {
  age?: number;
  birthDate: string;
  employeeID: number;
  fatherName: string;
  firstName: string;
  lastName: string;
  _id: string;
}
