import { Component, OnInit } from '@angular/core';
import { SeekerService } from 'src/app/services/seeker.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { NavbarUserServiceService } from '../services/navbar-user-service.service';
import { Router } from '@angular/router';
import { HeaderServiceService } from '../services/header-service.service';

@Component({
  selector: 'app-seekers',
  templateUrl: './seekers.component.html',
  styleUrls: ['./seekers.component.css']
})
export class SeekersComponent implements OnInit {
  loader: boolean;
  config: any;
  seeker = { count: 0, data: [] };
  needCount: number;


  constructor(
    private SeekerService: SeekerService,
    private loaderService: LoaderService,
    private toastr: ToastrService,
    private navbarUserServiceService: NavbarUserServiceService,
    private router: Router,
    public headerServiceService: HeaderServiceService,

  ) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.seeker.count
    };

  }

  ngOnInit() {
    this.navbarUserServiceService.show();
    this.headerServiceService.show();
    this.loaderService.startLoadingSpinner();
    this.loader = true;
    if (localStorage.getItem('SearchData') == "" || localStorage.getItem('SearchData') == undefined) {
      this.SeekerService.getAllSeekers().subscribe((res: any[]) => {

        this.seeker.data = res;
        
        this.seeker.count = this.seeker.data.length;

        if (this.seeker.data.length > 0) {

          this.needCount = this.seeker.data.length;
        }
        this.seeker.data.forEach(data => {

          data.companyLogo = "data:image/png;base64," + data.companyLogo;
          let desc: string = data.proposalDescription;
          data.proposalDescription = desc.substring(0, 399) + "...";
        });
        this.loader = false;
        this.loaderService.stopLoadingSpinner();
      }, (error) => {
        this.loaderService.stopLoadingSpinner();
        this.toastr.error(error.statusText)
      });
    }
    else {
      this.loader = true;
      this.seeker.data = JSON.parse(localStorage.getItem("SearchData" || "[]"));

      if (this.seeker.data.length > 0) {
        this.needCount = this.seeker.data.length;
      }

      this.seeker.data.forEach(data => {

        data.companyLogo = "data:image/png;base64," + data.companyLogo;
        let desc: string = data.proposalDescription;
        data.proposalDescription = desc.substring(0, 399) + "...";
        localStorage.setItem('SearchData', "");
      });
      this.loader = false;
      this.loaderService.stopLoadingSpinner();
    }
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  navigatetoViewNeed(selectedneed: any) {
    this.loaderService.startLoadingSpinner();
    localStorage.setItem("selectedNeed", JSON.stringify(selectedneed));
    this.router.navigate(['/view-need']);
  }
}
