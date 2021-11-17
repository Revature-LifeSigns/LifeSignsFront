import { InvokeFunctionExpr } from '@angular/compiler';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../services/admin/admin.service';
import { Unit } from '../services/util/unit';
import { User } from '../services/util/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[] = [];
  units:Unit[] = [];

  unitGroup = new FormGroup({
    unit: new FormControl('', Validators.required)
  });
  chosenUserId:number;

  unitAssigned:boolean = false;
  @ViewChild('unitAssignedModal') unitAssignedModal:any;

  constructor(private modalServ: NgbModal, private adminServ: AdminService) { }

  // todo: make sure logged in user is admin
  ngOnInit(): void {

    this.adminServ.getAllUsers().subscribe(
      response => {
        if(response != null){
          this.users = response;
          this.sortUsers();
        }
    });

    this.adminServ.getAllUnits().subscribe(
      response => {
        if(response != null){
          this.units = response;
        }
    });
  }

  assignUnit(unitForm:FormGroup){
    let chosenUnit: Unit =  new Unit(unitForm.value.unit);
    this.modalServ.dismissAll();
    
    this.adminServ.insertOrUpdateUnitAssignment(this.chosenUserId, chosenUnit).subscribe(
      response =>{
        if(response != null){ 
          this.unitAssigned = true;
          this.modalServ.open(this.unitAssignedModal, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result;
        }
      },
      error =>{
        this.unitAssigned = false;
        this.modalServ.open(this.unitAssignedModal, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result;

      });
  }

  getAssignedUnit(){
    this.adminServ.getUnit(this.chosenUserId).subscribe(
      response => {
        if(response != null){
          this.unitGroup.controls['unit'].setValue(response.unit)
        }else{
          this.unitGroup.controls['unit'].setValue('')
        }
    });
  }

  showUnitAssignModal(content: any, chosenUserId:number) {
    this.modalServ.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result;
    this.chosenUserId = chosenUserId;
    this.getAssignedUnit();
  }

  private sortUsers(){
    this.users.sort((a,b)=>{
      if(a.lastname.toLocaleLowerCase() > b.lastname.toLocaleLowerCase()) return 1;
      if(a.lastname.toLocaleLowerCase() < b.lastname.toLocaleLowerCase()) return -1;
      return 0;
    });
  }

}
