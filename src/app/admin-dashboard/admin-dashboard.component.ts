import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from '../services/admin-dashboard.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { NavbarServiceService } from '../services/navbar-service.service';
import { LoggedInAdminService } from '../services/logged-in-admin.service';
import { Router } from '@angular/router';
import { HeaderServiceService } from '../services/header-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  unprocessApplication: Array<{ name: string, timeStamp: string, projName: string }>;
  overview: any;
  UserRejectedNeedOfferLinkObj: any;
  rejectedNeedOfferLink: any;
  adminTypeId : any;
  statisticData: { totalOffers: number, publishedOffer: number, respondToOffer: number, totalNeeds: number, publishedNeeds: number, respondToNeed: number };
 
  constructor(private service: AdminDashboardService,
    private loaderService: LoaderService,
    private toastr: ToastrService,
    private navbarServiceService : NavbarServiceService  ,
    private loggedInAdminService : LoggedInAdminService,
    private router :Router,
    public headerServiceService:HeaderServiceService
    ) { }

  ngOnInit() {
    this.navbarServiceService.show();
    this.loggedInAdminService.hide();
    this.headerServiceService.show();
    if(localStorage.AdminData){
      this.router.navigate(['admin-dashboard']); 
      this.getDashUnprocessData();
    }
    else if(!localStorage.AdminData){
      this.navbarServiceService.hide();
      this.headerServiceService.hide();
      this.router.navigate(['admin-login']); 
    }
  //  else{
  //     this.getDashUnprocessData();
  //   }
    // this.adminTypeId =  document.getElementById('loggedInAdmin1')
    // this.adminTypeId.hidden = false
    
  }

  getDashUnprocessData() {
   this.loaderService.startLoadingSpinner();
    this.service.getDashUnprocessData().subscribe((res) => {
      if (res) {
        this.unprocessApplication = res.userDetails;
        this.getDashstatisticData();
        this.loaderService.stopLoadingSpinner();
      }
    },
      (error) => {
        this.loaderService.stopLoadingSpinner();
        this.toastr.error(error.statusText)

      });
  }

  getDashstatisticData() {
    this.loaderService.startLoadingSpinner();
    this.service.getDashstatisticData().subscribe((res) => {
      if (res) {
        this.statisticData = res;
        this.statisticData.totalOffers = this.statisticData.publishedOffer + this.statisticData.respondToOffer;
        this.statisticData.totalNeeds = this.statisticData.publishedNeeds + this.statisticData.respondToNeed;
        this.loaderService.stopLoadingSpinner();
      }
    },
      (error) => {
        this.loaderService.stopLoadingSpinner();
        this.toastr.error(error.statusText)
      });
  }

}
