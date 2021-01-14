import { Component, OnInit } from '@angular/core';
import { NavbarUserServiceService } from '../services/navbar-user-service.service';
import { HeaderServiceService } from '../services/header-service.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FAQsComponent implements OnInit {

  constructor(    private navbarUserServiceService : NavbarUserServiceService  ,     public headerServiceService:HeaderServiceService,

    ) { }

  ngOnInit() {
    this.navbarUserServiceService.show();
    this.headerServiceService.show();
  }

}
