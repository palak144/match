import { Component, OnInit } from '@angular/core';
import { NavbarUserServiceService } from 'src/app/services/navbar-user-service.service';
import { HeaderServiceService } from 'src/app/services/header-service.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { SupporterSignUpService } from 'src/app/services/supporter-sign-up.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-supporters-list',
  templateUrl: './supporters-list.component.html',
  styleUrls: ['./supporters-list.component.css']
})
export class SupportersListComponent implements OnInit {
  loader: boolean;
  config: any;
  supporterList = { count: 0, data: [] };
  supporterListCount: number;
  suppCount:number;
  constructor(
    private supporterSignUpService: SupporterSignUpService,
    private loaderService: LoaderService,
    private toastr: ToastrService,
    private location: Location,
    private navbarUserServiceService: NavbarUserServiceService,
    public headerServiceService: HeaderServiceService,
  ) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.supporterList.count
    };

  }

  ngOnInit() {
    this.navbarUserServiceService.show();
    this.headerServiceService.show();
    this.getSupporterListData();
  }

  getSupporterListData() {
    this.loaderService.startLoadingSpinner();
    this.loader = true;
    this.supporterSignUpService.supporterList().subscribe((res: any[]) => {
      this.supporterList.data = res;
      this.suppCount = this.supporterList.data.length;
      this.supporterList.data.forEach(data => {
        data.suppLogo = "data:image/png;base64," + data.suppLogo;
      });
      this.loader = false;
      this.loaderService.stopLoadingSpinner();
    }, (error) => {
      this.loaderService.stopLoadingSpinner();
      this.toastr.error(error.statusText)
    });
  }
  
  pageChanged(event) {
    this.config.currentPage = event;
  }
  suppWebsite(selectedSupporter: any) {
    window.location.href = selectedSupporter.suppWebAdd
  }
}
