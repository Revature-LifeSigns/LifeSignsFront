export interface Doctor {
  userId: number,
  firstName: string,
  lastName: string,
  dob: Date,
  address: string,
  picture: string,
  aboutMe: string,
  specialty: string,
  viewPreference: boolean,
  covidStatus: string
}
