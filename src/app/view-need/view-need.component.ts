import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarUserServiceService } from '../services/navbar-user-service.service';
import { HeaderServiceService } from '../services/header-service.service';

@Component({
  selector: 'app-view-need',
  templateUrl: './view-need.component.html',
  styleUrls: ['./view-need.component.css']
})
export class ViewNeedComponent implements OnInit {

  need: any;
  projectImage: string;
  companylogo: string;
  needtitle: string;
  constructor(private loaderService: LoaderService,
    private actr: ActivatedRoute,
    private toastr: ToastrService,
    private navbarUserServiceService: NavbarUserServiceService,
    public headerServiceService: HeaderServiceService,
  ) { }

  ngOnInit() {
    localStorage.removeItem('externalLinkId');
    localStorage.removeItem('Reject');
    this.navbarUserServiceService.show();
    this.headerServiceService.show();
    if (navigator.onLine) {
      var selectedNeed = JSON.parse(localStorage.getItem('selectedNeed'));
      this.need = this.actr.snapshot.data.needdata;
      this.need.technicalFieldDesc = Array.from(new Set(this.need.technicalFieldDesc));
      this.companylogo = "data:image/png;base64," + this.need.companyImage;
      this.projectImage = "data:image/png;base64," + this.need.projectImage;
      this.needtitle = selectedNeed.proposalTitle;
      this.loaderService.stopLoadingSpinner();
    }
    else {
      this.toastr.error("Check your internet connection");
    }
  }

}
