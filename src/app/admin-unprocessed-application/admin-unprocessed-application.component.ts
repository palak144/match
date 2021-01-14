import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminApplicationService } from '../services/admin-application.service'
import { LoaderService } from 'src/app/services/loader.service';
import { EventEmitter } from '@angular/core';
import { Output, Input } from '@angular/core';
import { UpdateDataService } from '../services/update-data.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-unprocessed-application',
  templateUrl: './admin-unprocessed-application.component.html',
  styleUrls: ['./admin-unprocessed-application.component.css']
})
export class AdminUnprocessedApplicationComponent implements OnInit,AfterViewInit{
  str: string = 't1';

  @Output() flagSet = new EventEmitter<string>();
  uneoiApplication = { count: 0, data: [] };
  searchFilter: Array<{ id: number, name: string }>;
  updatedAfterRejectionApplications = { count: 0, data: [] };
  loader: boolean;
  configUn = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0,
    id: 'configUn'
  };
  configReject = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0,
    id: 'configReject'
  }
  @Input() disabletab: any;

  constructor(
    private updateservice: UpdateDataService,
    private adminApplicationService: AdminApplicationService,
    private router: Router, 
    private loaderService: LoaderService,
    private toastr: ToastrService) {

  }
  ngAfterViewInit() {
    this.loaderService.stopLoadingSpinner();
  }
  pageChangedUn(event) {
    this.configUn.currentPage = event;

  }
  pageChangedReject(event) {
    this.configReject.currentPage = event;
  }

  ngOnInit() {
    this.loaderService.startLoadingSpinner();
    this.disabletab.tabs[1].disabled = true;
    this.getUnEOIApplications();
    this.getAllUpdatedAfterRejectionApplications();
    this.updateservice.getNavChangeEmitter().subscribe(item => {
      if(item==0){
      this.router.navigate(['/admin-applications', 0, 0]);
      this.loaderService.startLoadingSpinner();
      this.getUnEOIApplications();
      this.getAllUpdatedAfterRejectionApplications();
      }
     });
  }
  ngOnDestroy() {
    this.updateservice.getNavChangeEmitter().unsubscribe();
    this.loaderService.startLoadingSpinner();
  }


  getUnEOIApplications() {
    this.loaderService.startLoadingSpinner();
    this.adminApplicationService.getUnprocessApplication().subscribe((res) => {
      this.loaderService.startLoadingSpinner();
      if (res.adminMatchingVo!=null) {
        this.uneoiApplication.data = res.adminMatchingVo;
        this.uneoiApplication.count = this.uneoiApplication.data.length;
        this.configUn.totalItems = this.uneoiApplication.count;
        this.loader = false;
        this.loaderService.stopLoadingSpinner();
      }
      else if(res.status=="No Data found")
      {
        this.uneoiApplication.data.length=0;
        this.loaderService.stopLoadingSpinner();
      }
    },
      (error) => {
        this.loaderService.stopLoadingSpinner();
        this.toastr.error(error.statusText)
      });
  }
  selected(id: number) {
   this.disabletab.tabs[1].disabled = false;
    this.router.navigate(['/admin-applications', 1, id]);
    this.loaderService.startLoadingSpinner();
  }
  getAllUpdatedAfterRejectionApplications() {
    this.loaderService.startLoadingSpinner();
    this.loader = true;
    this.adminApplicationService.getAllUpdatedAfterRejectionApplications().subscribe((res: any[]) => {
      if (res) {
        this.updatedAfterRejectionApplications.data = res;
        this.uneoiApplication.count = this.updatedAfterRejectionApplications.data.length;
        this.configReject.totalItems = this.uneoiApplication.count;
        this.loader = false;
        this.loaderService.stopLoadingSpinner();
      }
    },
      (error) => {
        this.loaderService.stopLoadingSpinner();
        this.toastr.error(error.statusText)
      });
  }
}
