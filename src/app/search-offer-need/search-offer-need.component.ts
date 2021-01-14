import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {Wipo_common_services_Service} from "src/app/services/wipocommonservice.service"
import {FormGroup} from '@angular/forms';
import {Router} from  '@angular/router';
import {LoaderService} from "src/app/services/loader.service";
import {ToastrService} from 'ngx-toastr'
import { NavbarUserServiceService } from '../services/navbar-user-service.service';
import { HeaderServiceService } from '../services/header-service.service';

@Component({
  selector: 'app-search-offer-need',
  templateUrl: './search-offer-need.component.html',
  styleUrls: ['./search-offer-need.component.css']
})
export class SearchOfferNeedComponent implements OnInit {
    submitted = false;
    searchData :any;
    searchInfo:any;
    public searchForm: FormGroup;
    dropdownSettings = {};
    sdg = [];
    ipField = [] ;
    techAssistance = [];
    selectedCountries = [];
    techField=[];
    subTechField =[];
    countryName =[];
    selectedCriteriaId = [];
    interestvalue=1;

    constructor(
      private formBuilder: FormBuilder ,
      private wipocommonserviceService:Wipo_common_services_Service,
      private router:Router,
      private loaderService : LoaderService , 
      private toastr: ToastrService,
      private navbarUserServiceService : NavbarUserServiceService  ,
      public headerServiceService:HeaderServiceService,

      ) { }
      
    
  ngOnInit() {
    this.navbarUserServiceService.show();
    this.headerServiceService.show();
    this.searchForm = this.formBuilder.group({
      interest : [[],],
      ipFields: [[],],
      keyword: [[],],
      countries: [[],],
      techAssistances:  [[],],
      sdgs: [ [], ],
      techFields: [[], ], 
      publishedBy:[[],],
      subTechFields: [[], ],
    
    });
    this.loaderService.startLoadingSpinner();   
    this.getMultiDropList();     

    this.dropdownSettings = { 
      singleSelection: false, 
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: true,
      classes:"myclass custom-class",
      position:"bottom",
      maxHeight: "50px"
    }; 
  }
  getMultiDropList(){
  
   this.wipocommonserviceService.getAllCriteria().subscribe((res )=>{   
       this.ipField = res.ipSubjectArea;
       this.countryName=res.countryVo
       this.sdg = res.sdgs;
       this.techAssistance = res.technicalAssistance;
       this.techField = res.technicalFieldVo;
       this.loaderService.stopLoadingSpinner();   
      });
 }
 onItemSelect(event){

}
onClose(items: any){
  this.loaderService.startLoadingSpinner();   
  this.wipocommonserviceService.getSubTechnicalFeilds(this.multiSelectedList(this.searchForm.get('techFields').value))
  .subscribe((res : any[]) =>{
    this.subTechField = res;
    this.loaderService.stopLoadingSpinner();   
  })
}
 
  get f() { 
    return this.searchForm.controls; 
  }

  multiSelectedList( criteriaArray:any){
    this.selectedCriteriaId=[];
if(criteriaArray.length>0)
{
    criteriaArray.forEach(element => {
     
  this.selectedCriteriaId.push(element.id);
           });
  return this.selectedCriteriaId;
          }
          else
          {
            return [-1];
          }
  }
     
  onSubmit() {    
    this.submitted = true;
 
    this.searchData={
      //"interest": this.searchData.get('interest').value,
      //"keyword": this.searchData.get('keyword').value,
      //"publishedBy": this.searchData.get('publishedBy').value,
      "proposalTypeId":this.interestvalue,
      "ipSubjectAreaIds": this.multiSelectedList(this.searchForm.get('ipFields').value),
      "countryIds": this.multiSelectedList(this.searchForm.get('countries').value),
      "sdgIds":  this.multiSelectedList(this.searchForm.get('sdgs').value)  ,
      "technicalAssistanceIds": this.multiSelectedList(this.searchForm.get('techAssistances').value)  ,
      "technicalFieldIds": this.multiSelectedList(this.searchForm.get('techFields').value),
      "subTechnicalFieldIds":  this.multiSelectedList(this.searchForm.get('subTechFields').value) ,
    }

 if(this.multiSelectedList(this.searchForm.get('ipFields').value)[0]==-1 && this.multiSelectedList(this.searchForm.get('countries').value)[0]==-1 && this.multiSelectedList(this.searchForm.get('sdgs').value)[0]==-1 && this.multiSelectedList(this.searchForm.get('techAssistances').value)[0]==-1 && this.multiSelectedList(this.searchForm.get('techFields').value)[0]==-1 && this.multiSelectedList(this.searchForm.get('subTechFields').value)[0]==-1)
 {
  localStorage.setItem("SearchData", "");
  if(this.interestvalue==1)
  {
  this.router.navigate(['donors']); 
  }
   else if(this.interestvalue==2)
   {
   this.router.navigate(['/seekers']);
   }
 }
 else{
    this.wipocommonserviceService.getSearchResults(this.searchData).subscribe((res : any)=>{
      this.submitted = false;
      if(res.length>0 && res.errorCode!=204)
     {
      this.searchInfo=res;
     
      localStorage.setItem("SearchData", JSON.stringify(res));
      if(this.interestvalue==1)
      {
      this.router.navigate(['/donors']); 
      }
      else if(this.interestvalue==2)
      {
      this.router.navigate(['/seekers']);
      }
    }
    else
    {
      this.toastr.error("No Data Found")
    }
          });
        }
        }


        onItemChange(event) 
        {
         this.interestvalue=event.target.value;
        }
        onReset(){
          this.submitted = false;
      
        }
  
}
