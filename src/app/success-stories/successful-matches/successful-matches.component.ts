import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { NavbarUserServiceService } from 'src/app/services/navbar-user-service.service';
import { HeaderServiceService } from 'src/app/services/header-service.service';
import { SuccessMatchesService } from 'src/app/services/success-matches.service';

@Component({ 
  selector: 'app-successful-matches',
  templateUrl: './successful-matches.component.html',
  styleUrls: ['./successful-matches.component.css']
})
export class SuccessfulMatchesComponent implements OnInit {
  loader: boolean;
  config: any;
  matchList = { count: 0, data: [] };
  matchListCount: number;
  constructor(
    private successMatchesService : SuccessMatchesService,
    private loaderService: LoaderService,
    private toastr: ToastrService,
    private navbarUserServiceService: NavbarUserServiceService,
    public headerServiceService: HeaderServiceService,
  ) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.matchList.count
    };

  }

  ngOnInit() {
    this.navbarUserServiceService.show();
    this.headerServiceService.show();
    this.getMatchListData();
  }

  getMatchListData() {
    this.loader = true;
    this.loaderService.startLoadingSpinner();
    this.successMatchesService.successfulMatches().subscribe((res: any[]) => {
      this.matchList.data = res;
      this.matchListCount = this.matchList.data.length;
      this.matchList.data.forEach(data => {
        data.imageOld = "data:image/png;base64," + data.imageOld;
        data.imageNew = "data:image/png;base64," + data.imageNew;
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
  websiteOld(selectedMatch: any) {
    window.location.href = selectedMatch.websiteOld
  }
  websiteNew(selectedMatch: any) {
    window.location.href = selectedMatch.websiteNew
  }
}
