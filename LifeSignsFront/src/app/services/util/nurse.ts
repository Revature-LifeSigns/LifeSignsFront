export interface Nurse {

  user_id: number;
  email:string;
  username: string;
  firstname: string;
  dob: Date;
  lastname: string;
  photo: File;
  about_me: string;
  view_preference: boolean;
  covid_status: string;
}
