export interface User {
  document: number;
  name: string;
  lastName: string;
  birthDate: string;
}

export interface CreditRequest {
  companyName: string;
  companyNit: number;
  salary: number;
  startDate: string;
}

export interface CreditRequestResponse {
  approved: boolean;
  reason?: string;
  amountApproved?: number;
}
