import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { SupporterSignUpService } from "src/app/services/supporter-sign-up.service";
import { Wipo_common_services_Service } from "src/app/services/wipocommonservice.service";
import { ToastrService } from 'ngx-toastr';
import { NavbarUserServiceService } from 'src/app/services/navbar-user-service.service';
import { HeaderServiceService } from 'src/app/services/header-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-supporter',
  templateUrl: './sign-up-supporter.component.html',
  styleUrls: ['./sign-up-supporter.component.css']
})

export class SignUpSupporterComponent implements OnInit {
  public supporterForm: FormGroup;
  submitted = false;
  supportdata: any;
  url: any;
  orgCountries: any;
  orgTypes: any;
  base64result: string;
  result: string;
  projectFlagSize: boolean = false;
  dLogo: string;
  supporterLogo: any;

  constructor(
    private formBuilder: FormBuilder, 
    private router : Router, 
    private toastr: ToastrService,
    private supporterSignUpService: SupporterSignUpService,
    private wipocommonserviceService: Wipo_common_services_Service, 
    public headerServiceService: HeaderServiceService,
    private navbarUserServiceService: NavbarUserServiceService,
  ) { }

  ngOnInit() {
    this.navbarUserServiceService.show();
    this.headerServiceService.show();
    this.wipocommonserviceService.getCountry().subscribe((res: any[]) => {
      this.orgCountries = res;
    });
    this.wipocommonserviceService.getOrganisations().subscribe((res: any[]) => {
      this.orgTypes = res
    });
    this.dLogo = "assets/images/defaultImg.png";
    this.supporterForm = this.formBuilder.group({
      orgName: ['', Validators.required],
      contactName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      orgCountry: ['', Validators.required],
      logodesc: [''],
      supporterLogo: [''],
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$')]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15),
        Validators.pattern('^[0-9\+\-]*$')]),
      webAdd: new FormControl('', [
        Validators.required,
        Validators.pattern('https?://w{3}[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$')]),
      OrgAdd: ['', Validators.required],
      OrgTyp: ['', Validators.required],
    });

  }
  get f() {
    return this.supporterForm.controls;
  }

  onSelectFile($event) {
    let file = $event.target.files[0];
    if (file.size < 200000) {
      this.projectFlagSize = true;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.url = reader.result;
        this.supporterLogo = this.url;
        this.base64result = this.url.substr(this.url.indexOf(',') + 1);
        document.getElementById('sizeValidations1').style.color = 'black';
      }
      this.supporterForm.controls['supporterLogo'].setValue(file ? file.name : '');
    }
    else {
      this.projectFlagSize = false;
      document.getElementById('sizeValidations1').style.color = '#ffae42';
      this.supporterForm.controls['supporterLogo'].setValue(file ? '' : '');

    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.supporterForm.invalid) {
      return;
    }
    this.supportdata = {
      "countryId": this.supporterForm.get('orgCountry').value,
      "logoDesc": this.supporterForm.get('logodesc').value,
      "supporterJobTitle": this.supporterForm.get('jobTitle').value,
      "supporterLogo": this.base64result,
      "supporterMail": this.supporterForm.get('email').value,
      "supporterOrgAdd": this.supporterForm.get('OrgAdd').value,
      "supporterOrgName": this.supporterForm.get('orgName').value,
      "supporterOrgType": this.supporterForm.get('OrgTyp').value,
      "supporterPhone": this.supporterForm.get('phoneNumber').value,
      "supporterWebAdd": this.supporterForm.get('webAdd').value,
      "suppName" :this.supporterForm.get('contactName').value
     }

    this.supporterSignUpService.supporterSignUp(this.supportdata).subscribe((res: any[]) => {
      this.submitted = false;
      this.supporterLogo = "assets/images/defaultImg.png";
      document.getElementById('sizeValidations1').style.color = 'black';
      this.supporterForm.reset();
      this.router.navigate(['thank-you-supporters'])
    });
  }


}
