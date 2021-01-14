import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AdminApplicationService } from '../services/admin-application.service'
import { LoaderService } from 'src/app/services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { UpdateDataService } from '../services/update-data.service';

@Component({
  selector: 'app-admin-processed-application',
  templateUrl: './admin-processed-application.component.html',
  styleUrls: ['./admin-processed-application.component.css']
})
export class AdminProcessedApplicationComponent implements OnInit, AfterViewInit {

  processApplicationList: Array<{ id: number, offerName: string }>

  constructor(
    private updateservice: UpdateDataService,
    private service: AdminApplicationService,
    private loaderService: LoaderService,
    private toastrService: ToastrService) { }

  ngAfterViewInit() {
    this.getProcessApplicationData();

  }

  ngOnInit() {
    this.getProcessApplicationData();
    this.updateservice.getNavChangeEmitter()
      .subscribe(item => {
        if (item == 2) {
          //  this.loaderService.stopLoadingSpinner();
          this.getProcessApplicationData();
        }
      });
  }
  ngOnDestroy() {
    this.updateservice.getNavChangeEmitter().unsubscribe();
  }

  getProcessApplicationData() {
    this.service.getProcessApplication().subscribe((res) => {
      if (res) {
        this.processApplicationList = res;
        this.loaderService.stopLoadingSpinner();
      }
      else {
        this.processApplicationList = [];
        this.loaderService.stopLoadingSpinner();
      }
    },
      (error) => {
        this.loaderService.stopLoadingSpinner();
        this.toastrService.error(error.statusText);
      });
  }
  processApplication(id, action, applicantrefId) {
    this.service.postPublishApplication(id, action, applicantrefId).subscribe((res) => {
      if (res) {
        this.getProcessApplicationData();
        if (action == "publish") {
          this.toastrService.success("Application Published Succesfully");
        }
        else {
          this.toastrService.success("Application Deleted Succesfully");
        }

      }
    },
      (error) => {
        this.loaderService.stopLoadingSpinner();
        this.toastrService.error(error.statusText);
      });
  }

}
