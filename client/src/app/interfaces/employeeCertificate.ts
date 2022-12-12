export interface IEmployeeCertificate {
  date: string;
  department: string;
  occupation: string;
  personalData: { firstName?: string; lastName?: string; since?: string };
}
