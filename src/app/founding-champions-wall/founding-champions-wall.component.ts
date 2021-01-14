import { Component, OnInit } from '@angular/core';
import { NavbarUserServiceService } from '../services/navbar-user-service.service';
import { HeaderServiceService } from '../services/header-service.service';
import { ChampionsWallService } from '../services/champions-wall.service';
import { LoaderService } from '../services/loader.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-founding-champions-wall',
  templateUrl: './founding-champions-wall.component.html',
  styleUrls: ['./founding-champions-wall.component.css']
})
export class FoundingChampionsWallComponent implements OnInit {

  public championsImageData = { count: 0, data: [] };
  imageCount: number;

  constructor(    private navbarUserServiceService : NavbarUserServiceService  , 
         private loaderService :LoaderService,
         private toastr: ToastrService,
       public headerServiceService:HeaderServiceService,
       private championsWallService:ChampionsWallService

    ) { }

  ngOnInit() {
    this.navbarUserServiceService.show();
    this.headerServiceService.show();
    this.getChampionsImage();
  }
  getChampionsImage(){
    this.loaderService.startLoadingSpinner();
    this.championsWallService.getChampionsLogo().subscribe((res : any)=>{
        this.championsImageData.data = res;
        this.championsImageData.count =  this.championsImageData.data.length/12 ;
        this.loaderService.stopLoadingSpinner();

    },
    (error)=>{
      this.loaderService.stopLoadingSpinner();
      this.toastr.error(error.statusText)
    })
  }
}
