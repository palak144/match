import { Component, OnInit } from '@angular/core';
import { NavbarUserServiceService } from '../services/navbar-user-service.service';
import { HeaderServiceService } from '../services/header-service.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {

  constructor(private navbarUserServiceService: NavbarUserServiceService, public headerServiceService: HeaderServiceService,

  ) { }

  ngOnInit() {
    this.navbarUserServiceService.show();
    this.headerServiceService.show();
  }

}
