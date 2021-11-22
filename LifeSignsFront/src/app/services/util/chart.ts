import { User } from './user';

export interface Chart {

    address: string,
    chartid: number,
    diagnosis: string,
    diagnosis_approved: false,
    dob: string,
    doctor?: User,
    email: string,
    firstName: string,
    insuranceid: string,
    lastName: string,
    notes: string,
    nurse?: User,
    treatment: string
}


