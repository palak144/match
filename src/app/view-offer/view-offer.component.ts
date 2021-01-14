import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavbarUserServiceService } from '../services/navbar-user-service.service';
import { HeaderServiceService } from '../services/header-service.service';

@Component({
  selector: 'app-view-offer',
  templateUrl: './view-offer.component.html',
  styleUrls: ['./view-offer.component.css']
})

export class ViewOfferComponent implements OnInit {
  projectImage: string;
  companylogo: string;
  offertitle: string;
  offer: any;
  constructor(
    private loaderService: LoaderService,
    private actr: ActivatedRoute,
    private toastr: ToastrService,
    private navbarUserServiceService: NavbarUserServiceService,
    public headerServiceService: HeaderServiceService,

  ) {


  }
  ngOnInit() {
    this.navbarUserServiceService.show();
    this.headerServiceService.show();
    localStorage.removeItem('externalLinkId');
    localStorage.removeItem('Reject');
    if (navigator.onLine) {
      var selecteddonor = JSON.parse(localStorage.getItem('selectedOffer'));
      this.offer = this.actr.snapshot.data.offerdata;
      this.offer.technicalFieldDesc = Array.from(new Set(this.offer.technicalFieldDesc));
      this.companylogo = "data:image/png;base64," + this.offer.companyImage;
      this.projectImage = "data:image/png;base64," + this.offer.projectImage;
      this.offertitle = selecteddonor.proposalTitle;
      this.loaderService.stopLoadingSpinner();
    }
    else {
      this.toastr.error("check your network connection");
    }
  }
}
