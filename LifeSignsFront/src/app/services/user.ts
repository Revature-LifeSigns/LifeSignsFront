export class User {
  constructor(
    public userName: string,
    public password: string,
    public userId?: number,
    public roleId?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public dob?: number,
    public picture?: string,
    // public aboutMe?: string,
    public specialty?: string,
    public covidStatus?: string
  )
  {};
}
