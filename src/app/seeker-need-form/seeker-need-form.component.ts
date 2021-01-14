import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { CreateNeedService } from 'src/app/services/create-need.service';
import { CreateOfferService } from 'src/app/services/create-offer.service';
import { Wipo_common_services_Service } from "src/app/services/wipocommonservice.service";
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from "src/app/services/loader.service";
import { ToastrService } from 'ngx-toastr';
import { NavbarUserServiceService } from '../services/navbar-user-service.service';
import { HeaderServiceService } from '../services/header-service.service';

@Component({
  selector: 'app-seeker-need-form',
  templateUrl: './seeker-need-form.component.html',
  styleUrls: ['./seeker-need-form.component.css']
})
export class SeekerNeedFormComponent implements OnInit {
  public seekerNeedForm: FormGroup;
  submitted = false;
  sdg = [];
  ipField = [];
  techAssistance = [];
  techField = [];
  subTechField = [];
  dropdownSettings = {};
  countryName = [];
  seekerData: any;
  selectedCriteriaId = [];
  subTechnicaldata = []
  url: any;
  orgLogoData: string;;
  ProjectImageData: string;
  compLogofiletype: string;
  projectfiletype: string;
  rProposalId: any;
  proposalId : number = 0;
  selected_sdg: any;
  selected_ipFields: any;
  selected_countries: any;
  selected_techAssistances: any;
  selected_techFields: any;
  selected_subTechFields: any;
  companyLogo: any;
  dLogo: string;
  projectLogo: any;
  viewMode: boolean = false;
  btnstatus: string
  externalLinkId: any;
  typeHeader: string;
  navFrom: string;
  rejected: any;
  validate: boolean = false;
  summaryOfProposal_validate: boolean = true;
  whatDoINeed_validate: boolean = true;
  weWishToPartnerWith_validate: boolean = true;
  companyFlagSize: boolean = false;
  projectFlagSize: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private createNeedService: CreateNeedService,
    private loaderService: LoaderService,
    private wipocommonserviceService: Wipo_common_services_Service,
    private _routeParams: ActivatedRoute, private router: Router,
    private createOfferService: CreateOfferService,
    private toastr: ToastrService,
    private navbarUserServiceService: NavbarUserServiceService,
    public headerServiceService: HeaderServiceService,

  ) { }

  ngOnInit() {
    this.loaderService.startLoadingSpinner();
    this.navbarUserServiceService.show();
    this.headerServiceService.show();
    this.dLogo = "assets/images/defaultImg.png";
    this.btnstatus = "Submit";
    this.typeHeader = "Create Need";
    this.navFrom = "My Dashboard"
    this.externalLinkId = "";
    this.rejected = "";
    this._routeParams.params.subscribe(params => {
      this.rProposalId = params['id'];
    });
    if (this.rProposalId == 2) {
      this.typeHeader = "Create Need";
      this.navFrom = "My Dashboard"
    }
    else if (this.rProposalId == 4) {
      this.typeHeader = "Respond to Offer";
      this.navFrom = "View Offer"
    }
    if (localStorage.externalLinkId) {
      this.externalLinkId = localStorage.getItem("externalLinkId");
      this.rejected = localStorage.getItem("Reject");
      this.btnstatus = "Save";
      this.navFrom = "My Dashboard";
      this.viewNeedDetails();
    }
    //view mode
    this.selected_sdg = [];
    this.selected_ipFields = [];
    this.selected_countries = [];
    this.selected_techAssistances = [];
    this.selected_techFields = [];
    this.selected_subTechFields = [];
    this.viewMode = false;
    this.orgLogoData = "";
    this.ProjectImageData = "";
    this.compLogofiletype = "";
    this.projectfiletype = "";
    this.companyLogo = "";
    this.projectLogo = "";
    this.seekerNeedForm = this.formBuilder.group({
      title: ['', Validators.required],
      summaryOfProposal: ['', Validators.required],
      projectUrl: new FormControl('', [
        Validators.required,
        Validators.pattern('https?://w{3}[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$')]),
      proposedBug: [''],
      whatDoINeed: ['', Validators.required],
      weWishToPartnerWith: ['', Validators.required],
      ipFields: [[], Validators.required],
      countries: [[]],
      techAssistances: [[]],
      sdgs: [[]],
      techFields: [[]],
      subTechFields: [[]],
      uploadProjPic: [''],
      organizationLogo: [''],
    });

    this.getMultiDropList();

    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class",
      position: "bottom",
      maxHeight: "50px"
    };
  }

  getMultiDropList() {
    this.wipocommonserviceService.getAllCriteria().subscribe((res) => {
      this.sdg = res.sdgs;
      this.countryName = res.countryVo;
      this.ipField = res.ipSubjectArea;
      this.techAssistance = res.technicalAssistance;
      this.techField = res.technicalFieldVo;
      this.loaderService.stopLoadingSpinner();
    }, (error) => {
      this.loaderService.stopLoadingSpinner();
      this.toastr.error(error.statusText)
    });
  }

  onClose(items: any) {
    this.wipocommonserviceService.getSubTechnicalFeilds(this.multiSelectedList(this.seekerNeedForm.get('techFields').value))
      .subscribe((res: any[]) => {
        this.subTechField = res;
      }, (error) => {
        this.loaderService.stopLoadingSpinner();
        this.toastr.error(error.statusText)
      }
      )
  }

  get f() {
    return this.seekerNeedForm.controls;
  }

  multiSelectedList(criteriaArray: any) {
    this.selectedCriteriaId = [];
    if (criteriaArray != null) {
      criteriaArray.forEach(element => {
        this.selectedCriteriaId.push(element.id);
      });
    }
    return this.selectedCriteriaId;
  }
  getsubtechnicaldata(criteriaArray) {
    this.subTechnicaldata = [];
    criteriaArray.forEach(element => {
      this.subTechnicaldata.push({ "subtechnicalId": element.id, "technicalId": element.technicalFieldId })
    })
    return this.subTechnicaldata;
  }
  onSubmit() {

    this.submitted = true;
    this.submitted = true;
    if (this.seekerNeedForm.get("summaryOfProposal").value == "") {
     
      this.summaryOfProposal_validate = true;
    }
    else{
      this.summaryOfProposal_validate=false;
    }
    if (this.seekerNeedForm.get("whatDoINeed").value == "") {

      this.whatDoINeed_validate = true;
    }
    else{
      this.whatDoINeed_validate=false;
    }
    if (this.seekerNeedForm.get("weWishToPartnerWith").value == "") 
    {
      this.weWishToPartnerWith_validate = true;
    }
    else{
      this.weWishToPartnerWith_validate=false;
    }
    if (this.seekerNeedForm.invalid) {
      let invalidFields = [].slice.call(document.getElementsByClassName('ng-invalid'));
      this.scrollToElement(invalidFields[1]);
      return;
    }

    if (!this.summaryOfProposal_validate && !this.whatDoINeed_validate && !this.weWishToPartnerWith_validate) {
      if (localStorage.UserData) {
        var applicationId = JSON.parse(localStorage.getItem("UserData")).applicantRefId;
      }
        if(this.rProposalId == 4)
        {
          if( localStorage.getItem("externalLinkId") || localStorage.getItem("reject")  )
          {
            this.proposalId = 0
          }
          else{
            this.proposalId = JSON.parse(localStorage.getItem('selectedOffer')).proposalId;
          }
        }
      
      this.loaderService.startLoadingSpinner();
      this.seekerData = {
        "applicantId": applicationId,
        "countryId": this.multiSelectedList(this.seekerNeedForm.get('countries').value),
        "eoiRequestDesc": this.seekerNeedForm.get('summaryOfProposal').value,
        "eoiRequestTitle": this.seekerNeedForm.get('title').value,
        "eoiWeblink": this.seekerNeedForm.get('projectUrl').value,
        "ipFieldIds": this.multiSelectedList(this.seekerNeedForm.get('ipFields').value),
        "offer": this.seekerNeedForm.get('whatDoINeed').value,
        "partner": this.seekerNeedForm.get('weWishToPartnerWith').value,
        "projectTypeIds": 0,
        "rProposalTypeId": 2,
        "proposalId" : this.proposalId,
        "sdgids": this.multiSelectedList(this.seekerNeedForm.get('sdgs').value),
        "subtechnicalField": this.getsubTechnicalData(this.seekerNeedForm.get('subTechFields').value),
        "technicalAssistanceIds": this.multiSelectedList(this.seekerNeedForm.get('techAssistances').value),
        "technicalFieldIds": this.multiSelectedList(this.seekerNeedForm.get('techFields').value),
        "proposedBudget": this.seekerNeedForm.get('proposedBug').value,
        "eoiDocumentVo": [
          {
            "eoiDocTitle": "Project Picture",
            "eoiDocType": 2,
            "eoiDocument": this.ProjectImageData,
            "fileTypeExt": this.projectfiletype
          },
          {
            "eoiDocTitle": "Company Logo",
            "eoiDocType": 1,
            "eoiDocument": this.orgLogoData,
            "fileTypeExt": this.compLogofiletype
          }
        ]
      }
      if (this.rProposalId == 2) {

        this.seekerData.rProposalTypeId = 2;
      }
      else if (this.rProposalId == 4) {
        this.seekerData.rProposalTypeId = 4;
      }
      if (this.btnstatus != "Save") {
        this.createNeedService.createNeedDetails(this.seekerData).subscribe((res: any) => {
          localStorage.removeItem('externalLinkId');
          localStorage.removeItem('Reject');
          this.submitted = false;
          this.loaderService.stopLoadingSpinner();
          this.router.navigate(['thank-you']);
        }, (error) => {
          this.loaderService.stopLoadingSpinner();
          this.toastr.error(error.statusText);
        });
      }
      else {
        this.createOfferService.updateOfferDetails(this.externalLinkId, this.seekerData, this.rejected).subscribe((res: any[]) => {
          localStorage.removeItem('externalLinkId');
          localStorage.removeItem('Reject');
          this.loaderService.stopLoadingSpinner();
          this.submitted = false;
          this.router.navigate(['thank-you']);
        }, (error) => {
          this.loaderService.stopLoadingSpinner();
          this.toastr.error(error.statusText);
        });
      }
    }
    else {
      return;
    }
    localStorage.removeItem('externalLinkId');
    localStorage.removeItem('Reject');
  }
  scrollToElement(element) {
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
  getsubTechnicalData(criteriaArray) {
    if (criteriaArray != null) {
      this.selectedCriteriaId = [];
      criteriaArray.forEach(element => {
        this.selectedCriteriaId.push({ "subtechnicalId": element.id, "technicalId": 0 });
      });
      return this.selectedCriteriaId;
    }
  }

  editorValidation(id: number) {
    if (id == 1) {
      this.summaryOfProposal_validate = false;
    }
    else if (id == 2) {
      this.whatDoINeed_validate = false;
    }
    if (id == 3) {
      this.weWishToPartnerWith_validate = false;
    }
  }


  onOrganizationLogoChange($event) {

    let file = $event.target.files[0];
    var rest = file.name.substring(0, file.name.lastIndexOf(".") + 1);
    var last = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length); if (file.size < 200000) {
      this.companyFlagSize = true;
      this.compLogofiletype = last;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.url = reader.result;
        this.companyLogo = this.url;
        this.orgLogoData = this.url.substr(this.url.indexOf(',') + 1);
        document.getElementById('sizeValidations').style.color = 'black';

      }
      this.seekerNeedForm.controls['organizationLogo'].setValue(file ? file.name : '');
    }
    else {
      this.companyFlagSize = false;
      document.getElementById('sizeValidations').style.color = '#ffae42';
      this.seekerNeedForm.controls['organizationLogo'].setValue(file ? '' : '');
    }
  }

  onuploadProjPicChange($event) {
    let file = $event.target.files[0];
    var rest = file.name.substring(0, file.name.lastIndexOf(".") + 1);
    var last = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length);
    if (file.size < 200000) {
      this.projectFlagSize = true;
      this.projectfiletype = last;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.url = reader.result;
        this.projectLogo = this.url;
        this.ProjectImageData = this.url.substr(this.url.indexOf(',') + 1);
        document.getElementById('sizeValidations1').style.color = 'black';
      }
      this.seekerNeedForm.controls['uploadProjPic'].setValue(file ? file.name : '');
    }
    else {
      this.projectFlagSize = false;
      document.getElementById('sizeValidations1').style.color = '#ffae42';
      this.seekerNeedForm.controls['uploadProjPic'].setValue(file ? '' : '');
    }
  }


  onItemSelect(event) {
  }
  viewNeedDetails() {
    this.loaderService.startLoadingSpinner();
    this.createNeedService.getNeedDetails(this.externalLinkId, this.rProposalId).subscribe((res: any) => {
      this.navFrom = "My Dashboard";
      this.loaderService.stopLoadingSpinner();
      this.btnstatus = "Save";
      this.seekerNeedForm.patchValue({
        "title": res.eoiRequestTitle,
        "summaryOfProposal": res.eoiRequestDesc,
        "projectUrl": res.eoiWeblink,
        "proposedBug": res.eoiBudget,
        "whatDoINeed": res.offer,
        "weWishToPartnerWith": res.partner,
      });
      if (res.eoiCompanyDocumentVo != null) {
        this.orgLogoData = res.eoiCompanyDocumentVo.eoiDocument;
        this.companyFlagSize = true;
        this.companyLogo = "data:image/png;base64," + res.eoiCompanyDocumentVo.eoiDocument;
        this.compLogofiletype = res.eoiCompanyDocumentVo.fileTypeExt;
      }
      else {
        this.orgLogoData = "";
        this.companyFlagSize = false;
        this.companyLogo = "";
        this.compLogofiletype = "";
      }
      if (res.eoiProjectDocumentVo != null) {
        this.ProjectImageData = res.eoiProjectDocumentVo.eoiDocument;
        this.projectFlagSize = true;
        this.projectLogo = "data:image/png;base64," + res.eoiProjectDocumentVo.eoiDocument;
        this.projectfiletype = res.eoiProjectDocumentVo.fileTypeExt;
      }
      else {
        this.ProjectImageData = "";
        this.projectLogo = "";
        this.projectFlagSize = false;
        this.projectfiletype = "";
      }
      this.selected_sdg = res.criteriaResponseVo.sdgs;
      this.selected_ipFields = res.criteriaResponseVo.ipSubjectArea;
      this.selected_countries = res.criteriaResponseVo.countryVo;
      this.selected_techAssistances = res.criteriaResponseVo.technicalAssistance;
      this.selected_techFields = res.criteriaResponseVo.technicalFieldVo;
      this.selected_subTechFields = res.criteriaResponseVo.subTechnicalFieldVo;

    });

  }
  breadcrumbNav() {

    if (this.navFrom == "My Dashboard") {
      localStorage.removeItem('externalLinkId');
      localStorage.removeItem('Reject');
      this.router.navigate(['secure/user-dashboard']);
    }
    else {
      this.loaderService.startLoadingSpinner();
      this.router.navigate(['view-offer']);
    }
  }
  onReset() {
    this.submitted = false;
    this.projectLogo = "assets/images/defaultImg.png";
    this.companyLogo = "assets/images/defaultImg.png"
    this.seekerNeedForm.reset();

  }
}
