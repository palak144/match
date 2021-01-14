import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarUserServiceService } from '../services/navbar-user-service.service';
import { HeaderServiceService } from '../services/header-service.service';
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  UserDataResponseObj: any;
  UserExistingNeedOfferLinkObj: any;
  UserRejectedNeedOfferLinkObj: any;
  UserOfferCountObj: any;
  UserNeedCountObj: any;
  formatedDate: any;
  existingNeedOfferLink: any;
  gotData: boolean;
  userId: any;
  userData = false;

  constructor(
    private userService: UserService,
    private loaderService: LoaderService,
    private router: Router,
    private toastr: ToastrService, 
    private navbarUserServiceService: NavbarUserServiceService,
    public headerServiceService:HeaderServiceService,

  ) { }

  ngOnInit() {
    this.gotData = false;
    this.navbarUserServiceService.show();
    this.headerServiceService.show();
    this.loaderService.startLoadingSpinner();
    if(!localStorage.getItem('UserData')){
      this.getUserData(); 
    }
    else{
      var json = JSON.parse(localStorage.UserData);
      this.userId = json.userId;
          this.userExistingOfferNeedLinks();
          this.userRejectedOfferNeedLinks();
          this.UserNeedCount();
          this.UserOfferCount();
    }
  }
  getUserData() {
    this.loaderService.startLoadingSpinner();
    if (navigator.onLine) {
      this.userService.getUserDetails().subscribe((res) => {
        if (res.userId!=null) {
          localStorage.setItem('UserData', JSON.stringify(res))
          this.userId = res.userId;
          this.userExistingOfferNeedLinks();
          this.userRejectedOfferNeedLinks();
          this.UserNeedCount();
          this.UserOfferCount();
        }
        else
        {
          localStorage.removeItem("UserData");
          this.checkLogin();

        }

      }, (error) => {
        this.loaderService.stopLoadingSpinner();
        this.toastr.error(error.statusText);
        localStorage.removeItem("UserData");
      })
    } else {
      this.toastr.error("Check your internet connection");
      localStorage.removeItem("UserData");
    }
    
  }

  checkLogin() {
        let urlString = window.location.href;
        let modified_url = urlString.replace("#/", '');
        window.location.href = modified_url;
    }

  userDashboardData() {
    this.loaderService.startLoadingSpinner();

    this.userService.userDashboardService(this.userId).subscribe((res: any[]) => {
      if (res) {
        this.UserDataResponseObj = res;
        var date = new Date(this.UserDataResponseObj.createStamp);
        this.formatedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        this.loaderService.stopLoadingSpinner();
      }
    },
      (error) => {
        this.loaderService.stopLoadingSpinner();
        this.toastr.error(error.statusText)
      });
  }
  userExistingOfferNeedLinks() {
    this.loaderService.startLoadingSpinner();
    this.userService.userOfferNeedLinksService(this.userId).subscribe((res: any[]) => {
      if (res) {
        this.gotData = true;
        this.UserExistingNeedOfferLinkObj = res;
        this.existingNeedOfferLink = this.UserExistingNeedOfferLinkObj.eoiVo;
        this.loaderService.stopLoadingSpinner();
      }
    },
      (error) => {
        this.loaderService.stopLoadingSpinner();
        this.toastr.error(error.statusText)
      });


  }
  userRejectedOfferNeedLinks() {
    this.loaderService.startLoadingSpinner();
    this.userService.userDashboardRejectedLinksService(this.userId).subscribe((res: any[]) => {
      if (res) {
        this.gotData = true;
        this.UserRejectedNeedOfferLinkObj = res;
      }
    },
      (error) => {
        this.toastr.error(error.statusText);
        this.loaderService.stopLoadingSpinner();
      });
  }
  UserNeedCount() {
    this.userService.UserNeedCountService(this.userId).subscribe((res: any[]) => {
      this.UserNeedCountObj = res;
    },
      (error) => {
        this.loaderService.stopLoadingSpinner();
        this.toastr.error(error.statusText)
      });

  }
  UserOfferCount() {
    this.userService.UserOfferCountService(this.userId).subscribe((res: any[]) => {
      this.UserOfferCountObj = res;
    },
      (error) => {
        this.loaderService.stopLoadingSpinner();
        this.toastr.error(error.statusText)
      });
    this.userDashboardData();
  }
  navigate(Id: any, type: any, rejectflag: string) {
    
    localStorage.setItem("Reject", rejectflag);
    localStorage.setItem("externalLinkId", Id);
    if (type == 1 || type == 3) {

      this.router.navigate(['/secure/donor-offer-form', type]);
    }
    else if (type == 2 || type == 4) {
      
      this.router.navigate(['/secure/seeker-need-form', type]);
    }
  }
}