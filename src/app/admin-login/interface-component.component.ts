import { Component, OnInit  } from '@angular/core';
import{Router} from '@angular/router';
import { BsModalRef} from 'ngx-bootstrap/modal';
import {  FormGroup } from '@angular/forms';
import { FormBuilder,  Validators } from '@angular/forms';
import {LoginService} from 'src/app/services/login.service';
import {LoaderService} from 'src/app/services/loader.service';
import {NavbarServiceService} from 'src/app/services/navbar-service.service';
import {NavbarUserServiceService} from 'src/app/services/navbar-user-service.service';
import { LoggedInAdminService } from '../services/logged-in-admin.service';
import { ToastrService } from 'ngx-toastr';
import { HeaderServiceService } from '../services/header-service.service';

@Component({
  selector: 'app-interface-component',
  templateUrl: './interface-component.component.html',
  styleUrls: ['./interface-component.component.css']
})
export class InterfaceComponentComponent implements OnInit {
  public modalRef : BsModalRef;
public adminLoginForm: FormGroup;
submitted : boolean = false;
loginResponseObj :any;
adminLoginData:any;
adminTypeId:any;
adminType: boolean = false;
loggedInAdmin:any;

  constructor(

    private router : Router, 
    public loginservice : LoginService  , 
    private loaderService :LoaderService,
    private formBuilder :FormBuilder,
    public navbarServiceService: NavbarServiceService,
    public navbarUserServiceService: NavbarUserServiceService,
    public loggedInAdminService:LoggedInAdminService,
    private toastr: ToastrService,
    public headerServiceService:HeaderServiceService
  ) { }

  ngOnInit() {
    if (localStorage.UserData != undefined && localStorage.UserData != null) {
      localStorage.removeItem("UserData");

    }
    this.navbarServiceService.hide();
    this.navbarUserServiceService.hide();
    this.headerServiceService.hide();
    this.loggedInAdminService.show();
    this.adminLoginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get f() {
    return this.adminLoginForm.controls;
  }
  onSubmit() {
    this.loaderService.startLoadingSpinner();
    this.submitted = true;
    if (this.adminLoginForm.invalid) {
      return;
    }
        this.authenticate();

  }
  authenticate() {
    if(navigator.onLine)
    {
     this.loginservice.adminloginService(this.adminLoginForm.value.username ,this.adminLoginForm.value.password,0).subscribe((res : any[])=>{
      this.loginResponseObj = res;
     localStorage.setItem('AdminData',JSON.stringify(this.loginResponseObj))
      if(this.loginResponseObj.errorList == null){
        this.loaderService.stopLoadingSpinner();
        this.loginservice.loggedInAdminName = this.loginResponseObj.userId;
        this.loggedInAdminService.isAdminLoggedIn = true;
        this.router.navigate(['admin-dashboard']); 
        this.modalRef.hide()
     }else{
      this.loaderService.stopLoadingSpinner();
      this.toastr.error("Invalid Credentials")
     }
      },
      (error) => {
        this.loaderService.stopLoadingSpinner();
        this.toastr.error(error.statusText)
          });
 }else{
  this.toastr.error("Check your internet Connection")
 }

}
}
