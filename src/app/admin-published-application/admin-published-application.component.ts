import { Component, OnInit } from '@angular/core';
import { AdminApplicationService } from '../services/admin-application.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ActivatedRoute } from '@angular/router';
import { UpdateDataService } from '../services/update-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-published-application',
  templateUrl: './admin-published-application.component.html',
  styleUrls: ['./admin-published-application.component.css']
})
export class AdminPublishedApplicationComponent implements OnInit {

  publishedAppList = { count: 0, data: [] };
  rejectedAppList = { count: 0, data: [] };
  configPub: any
  configPub2: any;



  constructor(
    private updateservice: UpdateDataService,
    private service: AdminApplicationService,
    private loaderService: LoaderService,
    private toastr: ToastrService) {

    this.configPub = {
      itemsPerPage: 5,
      currentPage: 1
      , totalItems: 0,
      id: 'configPub'
    };
    this.configPub2 = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 0,
      id: 'configPub2'
    };

  }

  ngOnInit() {
    this.getPublisedApplication();
    this.updateservice.getNavChangeEmitter()
      .subscribe(item => {
        if (item == 3)
          this.getPublisedApplication();
      });
  }
  ngOnDestroy() {
    this.updateservice.getNavChangeEmitter().unsubscribe();
  }


  pageChangedPublished(event) {
    this.configPub.currentPage = event;
  }

  pageChangedPublished2(event) {
    this.configPub2.currentPage = event;
  }

  getPublisedApplication() {

    //this.loaderService.startLoadingSpinner();    
    this.service.getPublisedApplication().subscribe((res) => {
      if (res) {
        this.publishedAppList.data = res;
        this.configPub.totalItems = this.publishedAppList.data.length;
        this.getRejectedApplication();
      }
    },
      (error) => {
        this.loaderService.stopLoadingSpinner();
        this.toastr.error(error.statusText)
      });
  }

  getRejectedApplication() {
    this.service.getRejectedApplication().subscribe((res) => {
      if (res) {
        this.rejectedAppList.data = res
        this.configPub2.totalItems = this.rejectedAppList.data.length;
        // this.loaderService.stopLoadingSpinner();           
      }
    },
      (error) => {
        this.loaderService.stopLoadingSpinner();
        this.toastr.error(error.statusText)
      });
  }

}
