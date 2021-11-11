import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private userService: UserService, private rotuer: Router) { }

  canActivate(){

  }
}
