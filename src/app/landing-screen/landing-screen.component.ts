import { Component, OnInit , TemplateRef , Input } from '@angular/core';
import{Router, RouteConfigLoadEnd} from '@angular/router';
import {BsModalService , BsModalRef} from 'ngx-bootstrap/modal';
import {  FormGroup, FormControl  } from '@angular/forms';
import { FormBuilder,  Validators } from '@angular/forms';
import {LoaderService} from 'src/app/services/loader.service'
import { NavbarUserServiceService } from '../services/navbar-user-service.service';
import { HeaderServiceService } from '../services/header-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-landing-screen',
  templateUrl: './landing-screen.component.html',
  styleUrls: ['./landing-screen.component.css']
})
export class LandingScreenComponent implements OnInit {
  adminLoginForm: FormGroup;
  loading = false;
  returnUrl:string;
  localUserLogin:{};
  @Input() id: number;
  public modalRef : BsModalRef;
  loginResponseObj :any;
  submitted = false;
  interestvalue :number;

  constructor( 
    private formBuilder: FormBuilder ,
    private router : Router, 
    private modalService : BsModalService ,
    private navbarUserServiceService : NavbarUserServiceService  , 
    public headerServiceService:HeaderServiceService,
    private loaderService :LoaderService,
    private toastr: ToastrService) 
     { }

  ngOnInit() {
    this.navbarUserServiceService.show();
    this.headerServiceService.show();
}
  public openModal(template :TemplateRef<any>){
 this.modalRef = this.modalService.show(template)
  }
onSubmit(){
  if(localStorage.UserData){
    this.toastr.error("Cannot log in. There is already a active session.")
  }
  else{
  this.modalRef.hide();
  this.router.navigate(['admin-login']); 
  }
}
seekerSpecificPage() {
  localStorage.setItem('SearchData',"");
  this.router.navigate(['seekers']); 
}
donorSpecificPage() {
  this.router.navigate(['donors']); 
}
supporterSpecificPage() {
  this.router.navigate(['supporter-info']); 
}
successStoryPage() {
  this.router.navigate(['success-stories']); 
}
wallOfChampionPage(){
  this.router.navigate(['our-community']); 
}
openWipoHome(){
  window.open("https://www.wipo.int/portal/en/", "_blank");
}
onItemChange(event) {
this.interestvalue=event.target.value;
}
}
