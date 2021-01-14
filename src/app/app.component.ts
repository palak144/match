import { Component, OnInit } from '@angular/core';
import { Router, } from '@angular/router';
import { LoginService } from 'src/app/services/login.service'
import { LoaderService } from 'src/app/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { NavbarServiceService } from 'src/app/services/navbar-service.service';
import { NavbarUserServiceService } from 'src/app/services/navbar-user-service.service'
import { UserService } from './services/user.service';
import { LoggedInAdminService } from './services/logged-in-admin.service';
import { HeaderServiceService } from './services/header-service.service';
import { TranslateService } from './services/translate.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

selectLang : string = "English"; 

  constructor(
    private router: Router,
    public navbarServiceService: NavbarServiceService,
    public navbarUserServiceService: NavbarUserServiceService,
    public loginService: LoginService,
    private loaderService: LoaderService,
    public loggedInAdminService: LoggedInAdminService,
    public userService: UserService,
    public headerServiceService: HeaderServiceService,
    private toastr: ToastrService,
    private location: Location,
    private translate: TranslateService) {
  }

  setLang(lang: string, fullLang : string) {
    this.translate.use(lang);
    this.selectLang = fullLang;
    document.getElementById('collapse').classList.remove('show');
    document.getElementById('arrowChange').classList.add('collapsed')

   }

  ngOnInit() {
    if (localStorage.AdminData) {
      var json = JSON.parse(localStorage.AdminData);
      this.loggedInAdminService.isAdminLoggedIn = true;
      this.loginService.loggedInAdminName = json.userId
    }

    if (localStorage.UserData) {
      this.userService.isUserLoggedIn = true;

    } else {
      if (window.location.href.indexOf("/secure") > -1) {
        this.loaderService.startLoadingSpinner();
        this.getUserData();
      }
    }
   
  }
  getUserData() {
    if (navigator.onLine) {

      this.userService.getUserDetails().subscribe((res) => {
        if (res.userId != null) {
          this.loaderService.stopLoadingSpinner();
          localStorage.setItem('UserData', JSON.stringify(res));
        }
        else {
          this.loaderService.stopLoadingSpinner();
          localStorage.removeItem("UserData");
          this.checkLogin();
        }

      }, (error) => {
        this.loaderService.stopLoadingSpinner();
        this.toastr.error(error.statusText);
        localStorage.removeItem("UserData");
      })
    } else {
      this.loaderService.stopLoadingSpinner();
      this.toastr.error("Check your internet connection");
      localStorage.removeItem("UserData");
    }

  }
  checkLogin() {
    let urlString = window.location.href;
    let modified_url = urlString.replace("#/", '');
    window.location.href = modified_url;
  }

  signOutAdmin() {
    this.userService.isUserLoggedIn = false;
    localStorage.clear();
    this.navbarUserServiceService.show();
    this.headerServiceService.show();
    this.loggedInAdminService.isAdminLoggedIn = false;
    this.navbarServiceService.hide();
    this.headerServiceService.show();
    this.router.navigate(['/home']);

  }
  signOutUser() {
    this.userService.isUserLoggedIn = false;
    localStorage.clear();
    this.userService.getLogout().subscribe((res) => {
      window.location.href = "https://www3.wipo.int/wipoaccounts/en/usercenter/public/logout.xhtml?returnURL=https://www3.wipo.int/match/"
    });


  }
}
