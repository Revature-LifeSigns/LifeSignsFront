import { Byte } from "@angular/compiler/src/util";
import { Photo } from "./photo";

export class User {
    constructor(
        private _role:string,
        private _username:string,
        private _pwd:string,
        private _email:string,
        private _fname:string,
        private _lname:string,
        private _dob:string,
        private _address:string,
        private _image:string,
        private _about:string,
        private _viewpref:boolean,
        private _covidstatus:string,
        private _userid?:number
    ) { }

    public get userid() {
        return this._userid;
    }

    public get username() {
        return this._username;
    }

    public set username(theUsername:string) {
        if (this.validateUsername(theUsername)) {
            this._username = theUsername;
        } else {
            alert('Username is invalid.');
        }
    }

    // Username requirement: Must be lowercase, start with a letter, and can
    // contain numbers, underscores, and periods (5-20 characters).
    private validateUsername(theUsername:string) {
        const re = /^[a-z]{1}[a-z0-9_.]{4,20}$/;
        return re.test(String(theUsername));
    }

    public get pwd() {
        return this._pwd;
    }

    public set pwd(thePwd:string) {
        if (this.validatePwd(thePwd)) {
            this._pwd = thePwd;
        } else {
            alert('Password is invalid.');
        }
    }

    // Password requirement: Must include at least 1 lowercase, 1 uppercase,
    // 1 number, and 1 special character (8-20 characters).
    private validatePwd(thePwd:string) {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$/;
        return re.test(String(thePwd));
    }

    public get email() {
        return this._email;
    }

    public set email(theEmail:string) {
        if (this.validateEmail(theEmail)) {
            this._email = theEmail;
        } else {
            alert('Email address is invalid.');
        }
    }

    // Email requirement: Must be a valid email [name@domain] (3-50 characters).
    private validateEmail(theEmail:string) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(theEmail).toLowerCase());
    }

    public get role() {
        return this._role;
    }

    // Roles: (1) Doctor, (2) Nurse, (3) Patient
    public set role(theRole:string) {
        this._role = theRole;
    }

    public get firstname() {
        return this._fname;
    }

    public set firstname(name:string) {
        this._fname = name;
    }

    public get lastname() {
        return this._lname;
    }

    public set lastname(name:string) {
        this._lname = name;
    }

    public get dob() {
        return this._dob;
    }

    public set dob(birthday:string) {
        this._dob = birthday;
    }

    public get address() {
        return this._address;
    }

    public set address(theAddress:string) {
        this._address = theAddress;
    }

    public get image() {
        return this._image;
    }

    public set image(filename: string) {
        let baseURL = "http://s3.amazonaws.com/lifesigns/";

      this._image = baseURL + filename;
    }
    public get aboutMe() {
        return this._about;
    }

    public set aboutMe(description:string) {
        this._about = description;
    }

    public get viewPref() {
        return this._viewpref;
    }

    public set viewPref(mode:boolean) {
        this._viewpref = mode;
    }

    public get covidStatus() {
        return this._covidstatus;
    }

    public set covidStatus(status:string) {
        this._covidstatus = status;
    }
}
