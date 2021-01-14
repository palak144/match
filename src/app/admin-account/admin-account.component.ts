import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import {AuthenticationService} from 'src/app/services/authentication.service'
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../services/loader.service';
import { NavbarServiceService } from '../services/navbar-service.service';
import { LoggedInAdminService } from '../services/logged-in-admin.service';
import { Router } from '@angular/router';
import { HeaderServiceService } from '../services/header-service.service';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.css']
})
export class AdminAccountComponent implements OnInit {
public adminAccountForm : FormGroup;
submitted = false;
adminAccountData: any;
loginResponseObj :any;

   constructor(private formBuilder: FormBuilder , 
    private authenticationService:AuthenticationService ,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    public loggedInAdminService:LoggedInAdminService,
    private navbarServiceService : NavbarServiceService  ,
    private router : Router, 
    public headerServiceService:HeaderServiceService

    ) { }

   ngOnInit() {
     this.navbarServiceService.show();
   this.headerServiceService.show();

    //  if(localStorage.AdminData && ){
    //   this.loggedInAdminService.isAdminLoggedIn = true;
    //   this.router.navigate(['create-admin-account']); 
    // }
    if(!localStorage.AdminData){
      this.navbarServiceService.hide()
      this.headerServiceService.hide();
      this.router.navigate(['admin-login']); 
    }
    else{
    this.loaderService.stopLoadingSpinner();
    this.adminAccountForm = this.formBuilder.group({
      userId: ['', Validators.required],
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}$')]),
        userName: ['', Validators.required],
        password: ['', Validators.required],
    });
  }
   }

  get f() {
    return this.adminAccountForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    
    if (this.adminAccountForm.invalid) {
      return;
    }

    this.adminAccountData = {
  "displayName":  this.adminAccountForm.get('userName').value,
  "password": this.adminAccountForm.get('password').value,
  "userEMail":  this.adminAccountForm.get('email').value,
  "userId": this.adminAccountForm.get('userId').value,
    }
    
    this.authenticationService.adminSignUp(this.adminAccountData).subscribe((res: any[]) => {
      this.loginResponseObj = res;
      if(this.loginResponseObj.errorList == null){
          this.loaderService.stopLoadingSpinner();
          this.toastr.success("Account Created Successfully")
          this.submitted = false;
          this.adminAccountForm.reset();
       }
      else{
        this.loaderService.stopLoadingSpinner();
        this.toastr.error("Admin Id or E-mail Already exist")
       }
       this.loaderService.stopLoadingSpinner();
        });
           (error) => {
          this.loaderService.stopLoadingSpinner();
          this.toastr.error(error.statusText)
            }
  }
}
