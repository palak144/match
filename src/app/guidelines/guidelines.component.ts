import { Component, OnInit } from '@angular/core';
import { NavbarUserServiceService } from '../services/navbar-user-service.service';
import { HeaderServiceService } from '../services/header-service.service';

@Component({
  selector: 'app-guidelines',
  templateUrl: './guidelines.component.html',
  styleUrls: ['./guidelines.component.css']
})
export class GuidelinesComponent implements OnInit {

  panelExpanded:boolean;
  constructor(    private navbarUserServiceService : NavbarUserServiceService  ,     public headerServiceService:HeaderServiceService,

    ) { }

  ngOnInit() {
    this.panelExpanded = false;
    this.navbarUserServiceService.show();
    this.headerServiceService.show();
  }

}
