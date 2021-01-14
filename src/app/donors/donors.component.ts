import { Component, OnInit } from '@angular/core';
import {DonorService} from 'src/app/services/donor.service'
import {LoaderService} from 'src/app/services/loader.service'
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { NavbarUserServiceService } from '../services/navbar-user-service.service';
import { HeaderServiceService } from '../services/header-service.service';

@Component({
  selector: 'app-donors',
  templateUrl: './donors.component.html',
  styleUrls: ['./donors.component.css']
})
export class DonorsComponent implements OnInit {
  config: any;
  donor = { count: 0, data: [] };
  offerCount:number;
  donorsinfo:any;  
  loader : boolean;

  constructor(
    private donorService:DonorService,
    private loaderService :LoaderService,
    private router:Router,
    private toastr: ToastrService,
    private navbarUserServiceService : NavbarUserServiceService  ,
    public headerServiceService:HeaderServiceService,

    ) { 
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.donor.count
    };
  }

  ngOnInit() {
    this.navbarUserServiceService.show();
    this.headerServiceService.show();
    this.loaderService.startLoadingSpinner();
    this.loader=true;
    if(localStorage.getItem('SearchData')==""||localStorage.getItem('SearchData')==undefined)
    {
this.donorService.getAllDonors().subscribe((res:any[])=>
{

 this.donor.data=res;
 this.donor.count=this.donor.data.length;

if(this.donor.data.length>0)
{
this.offerCount=this.donor.data.length;
}

this.donor.data.forEach(data => {
   data.companyLogo="data:image/png;base64,"+data.companyLogo;
let desc:string=data.proposalDescription;
   data.proposalDescription= desc.substring(0, 399)+"...";
});
this.loader=false;
this.loaderService.stopLoadingSpinner();
},(error) => {
  this.loaderService.stopLoadingSpinner();
  this.toastr.error(error.statusText)
});
  }
  else{

this.donor.data=JSON.parse(localStorage.getItem('SearchData'));

if(this.donor.data.length>0)
{
  
  this.donor.data.forEach(data => {
    data.companyLogo="data:image/png;base64,"+data.companyLogo;
 let desc:string=data.proposalDescription;
    data.proposalDescription= desc.substring(0, 399)+"...";
    localStorage.setItem('SearchData',"");
 });

this.offerCount=this.donor.data.length;
}
this.loader=false;
this.loaderService.stopLoadingSpinner();
  }
  }
  pageChanged(event){
    this.config.currentPage = event;
  }
  navigatetoViewOffer(selectedoffer)
  {
  this.loaderService.startLoadingSpinner();
localStorage.setItem("selectedOffer",JSON.stringify(selectedoffer));
this.router.navigate(['/view-offer']);

  }



}
