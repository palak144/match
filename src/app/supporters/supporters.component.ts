import { Component, OnInit } from '@angular/core';
import { NavbarUserServiceService } from '../services/navbar-user-service.service';
import { HeaderServiceService } from '../services/header-service.service';

@Component({
  selector: 'app-supporters',
  templateUrl: './supporters.component.html',
  styleUrls: ['./supporters.component.css']
})
export class SupportersComponent implements OnInit {

  constructor(    private navbarUserServiceService : NavbarUserServiceService  ,     public headerServiceService:HeaderServiceService,

    ) { }

  ngOnInit() {
    this.navbarUserServiceService.show();
    this.headerServiceService.show();
  }

}
