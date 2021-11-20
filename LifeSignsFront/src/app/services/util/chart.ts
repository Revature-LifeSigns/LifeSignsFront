import { User } from './user';

export interface Chart {

    address: string,
    chartid: 5,
    diagnosis: string,
    diagnosis_approved: true,
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


// doctor: string;
// nurse: string;
// firstname: string;
// lastname: string;
// dob: Date;
// address: string;
// email: string;
// insuranceId: number;
// room: number;
// diagnosis: string;
// notes: string;