import { Component, OnInit , ViewChild, ElementRef,Input, EventEmitter, Output} from '@angular/core';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from "src/app/services/loader.service";
import {AdminApplicationService} from '../services/admin-application.service';
import {UpdateDataService}  from '../services/update-data.service'
import { NavbarUserServiceService } from '../services/navbar-user-service.service';
import { LoggedInAdminService } from '../services/logged-in-admin.service';
import { NavbarServiceService } from '../services/navbar-service.service';
import { HeaderServiceService } from '../services/header-service.service';

@Component({
  selector: 'app-admin-applications',
  templateUrl: './admin-applications.component.html',
  styleUrls: ['./admin-applications.component.css']
})
export class AdminApplicationsComponent implements OnInit{

@ViewChild('tabset', { static : false}) tabsetEl: ElementRef;
@ViewChild('tabset', { static : false}) tabset: TabsetComponent;
@ViewChild('first' ,  { static : false}) first: TabDirective;
@ViewChild('second' ,  { static : false}) second: TabDirective;
@Input('flagString')  fl:string;
@ViewChild('appAdminProcessedApplication' ,  { static : false}) t1:Component;
@Output() update: EventEmitter<number> = new EventEmitter()
  activeTab:number;
  tabVisible1:boolean;
  tabVisible2:boolean = true;
  tabVisible3:boolean;
  tabVisible4:boolean;

  constructor(private service:AdminApplicationService, private router : Router , private loggedInAdminService :LoggedInAdminService , private navbarServiceService : NavbarServiceService  , private navbarUserServiceService : NavbarUserServiceService  , 
    private updateservice:UpdateDataService, public headerServiceService:HeaderServiceService
    ,private _routeParams: ActivatedRoute, private route:Router,private loaderService :LoaderService) 
    { 
    }
  ngOnInit() {
  }
  ngAfterViewInit(){
    if(!localStorage.AdminData){
      this.navbarServiceService.hide();
      this.headerServiceService.hide();
      this.router.navigate(['admin-login']); 
    }
    else{
    this.navbarUserServiceService.hide();
    this.navbarServiceService.show();
    this.headerServiceService.show();
    this._routeParams.params.subscribe(params => {
      this.activeTab = params['id']; 
      this.tabset.tabs[this.activeTab].active = true;  
   });
  }
  }
  switchTab($event){
    if($event.tabs[2].active)
    {
      this.publishService(2);
    }
    else if($event.tabs[3].active)
    {
      this.publishService(3);
    }
    else if($event.tabs[0].active)
    {
      this.publishService(0);
    }
    if(($event.tabs[2].active) ||($event.tabs[3].active)||($event.tabs[0].active))
    {
      $event.tabs[1].disabled = true;
    }

  }
   publishService(id){   
   this.updateservice.emitNavChangeEvent(id);

}
  
  onTabSelect(tabId){
  }

}
 

