import { Component, OnInit, AfterViewInit, TemplateRef, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Wipo_common_services_Service } from "src/app/services/wipocommonservice.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AdminApplicationService } from 'src/app/services/admin-application.service';
import { LoaderService } from "src/app/services/loader.service";
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common'
import { LoggedInAdminService } from '../services/logged-in-admin.service';
import { HeaderServiceService } from '../services/header-service.service';

@Component({
  selector: 'app-admin-approved-application',
  templateUrl: './admin-approved-application.component.html',
  styleUrls: ['./admin-approved-application.component.css']
})

export class AdminApprovedApplicationComponent implements OnInit, AfterViewInit {
  public approvedAppForm: FormGroup;
  getAdminApproveObj: any;
  formatedDate: any;
  dLogo:any;
  approveApplicationData: any;
  submitted = false;
  submittedPopUp : boolean = false;
  url: any;
  projIntrested = [];
  affectedCountries = [];
  sdg = [];
  ipField = [];
  techAssistance = [];
  techField = [];
  subTechField = [];
  dropdownSettings = {};
  countryName = [];
  globalIssues = [];
  affRegion = [];
  selectedCriteriaId = [];
  subTechnicaldata = [];
  projType = [];
  orgLogoData: string="";
  ProjectImageData: string="";
  compLogofiletype: string;
  projectfiletype: string;
  selected_projIntrested: any;
  selected_affectedCountries: any;
  selected_sdg: any;
  selected_ipFields: any;
  selected_countries: any;
  selected_techAssistances: any;
  selected_techFields: any;
  selected_subTechFields: any;
  selected_affRegion: any;
  selected_globalIssues: any;
  companyLogo: string;
  projectLogo: string;
  dropdownList = [];
  selectedItems = [];
  busSelector: Array<{ id: number, itemName: string }>;
  annualTurnover: Array<{ id: number, itemName: string }>;
  projPeriodList: Array<{ id: number, itemName: string }>;
  bussiness_sector = [];
  staff_size: Array<{ id: number, itemName: string }>;
  tabVisible1: boolean;
  disable: boolean = true;
  eoiRequestId: any;
  overalAuthStatus = "";
  authStatusId: number;
  partyID: "";
  userID: "";
  proposalID: "";
  selectedId: number
  @Output() flagSet = new EventEmitter<string>();
  authStatus = [];
  reasonDropdown = [];
  selectedEoiId: number = 0;
  applicantRefId: number = 0;
  public adminApprovedForm: FormGroup;
  public modalRef: BsModalRef;
  approved_proposalId: any;
  authStatusApprovePopup: any;
  reqAuthStatus: Array<{ id: number, name: string }>;
  rejReason: Array<{ id: number, name: string }>;
  @Input() test: any;
  approveFlag: boolean = false;
  currentDate: any;
  rejectFlag: boolean = false;
  website_validation: boolean = false;
  companyFlagSize:boolean = false;
  projectFlagSize:boolean = false;
  eoiStatusImage:any;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router,
    private wipo_common_services_Service: Wipo_common_services_Service,
    private adminApplicationService: AdminApplicationService,
    private loaderService: LoaderService, private toastr: ToastrService,
    private loggedInAdminService:LoggedInAdminService,
    public headerServiceService:HeaderServiceService

  ) {
  }

  ngAfterViewInit() {
    this.viewDetails();
  }

  ngOnInit() {
    this.bindForm();
    this.bindDropDown();
    //popup
    this.getMultiDropList();
    //view mode
    this.selected_projIntrested = [];
    this.selected_affectedCountries = [];
    this.selected_sdg = [];
    this.selected_ipFields = [];
    this.selected_countries = [];
    this.selected_techAssistances = [];
    this.selected_techFields = [];
    this.selected_subTechFields = [];
    this.selected_affRegion = [];
    this.selected_globalIssues = [];
    this.dLogo = "assets/images/defaultImg.png";  
  }

  bindForm() {
    this.approvedAppForm = this.formBuilder.group({
      appRefID: [''],
      eoiReqID: [''],
      ipAddress: [''],
      reqDate: [''],
      instName: [''],
      appType: [''],
      fName: [''],
      lname: [''],
      add: [''],
      city: [''],
      country: ['', Validators.required],
      contactNo: [''],
      mobileNo: [''],
      email: [''],
      faxNo: [''],
      website: ['', Validators.pattern('https?://w{3}[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$')],
      cProfile: [''],
      serviceProvided: [''],
      busSelector: ['0', Validators.required],
      staffSize: ['0'],
      objective: [''],
      partnership: [''],
      projTitle: ['', Validators.required],
      proType: [''],
      projDesciption: ['', Validators.required],
      projWeblink: [''],
      annTurnover: ['0', Validators.required],
      projBenefit: [''],
      projRisk: [''],
      projInstID: [[], Validators.required],
      affCountries: [[], Validators.required],
      globalIssueID: [[], Validators.required],
      techFieldsID: [[], Validators.required],
      subTechFieldID: [[], Validators.required],
      ipSubjID: [[], Validators.required],
      affRegionID: [[], Validators.required],
      projTypeID: [[], Validators.required],
      techAssisID: [[], Validators.required],
      sdgs: [[], Validators.required],
      uploadProjPic: [''],
      organizationLogo: [''],
      proposedBudget: ['', Validators.required],
    });

    this.bussiness_sector = [
      { "id": 1, "itemName": "Accessories/Apparel/Fashion Design" },
      { "id": 2, "itemName": "Agriculture/Dairy Technology" },
      { "id": 3, "itemName": "Airlines/Hotel/Hospitality/Travel/Tourism/Restaurants" },
      { "id": 4, "itemName": "Architectural Services/ Interior Designing" },
      { "id": 5, "itemName": "Auto Ancillary/Automobiles/Components" },
      { "id": 6, "itemName": "Biotechnology/Pharmaceutical/Clinical Research" },
      { "id": 7, "itemName": "Cement/Construction/Engineering/Metals/Steel/Iron" },
      { "id": 8, "itemName": "Chemicals/Petro Chemicals/Plastics" },
      { "id": 9, "itemName": "Computer Hardware/Networking" },
      { "id": 10, "itemName": "Consumer FMCG/Foods/Beverages" },
      { "id": 11, "itemName": "Consumer Goods - Durables" },
      { "id": 12, "itemName": "IT Enabled Services/BPO/CRM" },
      { "id": 13, "itemName": "Education/Training/Teaching" },
      { "id": 14, "itemName": "Entertainment/Media/Publishing/Dotcom" },
      { "id": 15, "itemName": "Healthcare/Medicine" },
      { "id": 16, "itemName": "Law/Legal Firms" },
      { "id": 17, "itemName": "Machinery/Equipment Manufacturing/Industrial Products" },
      { "id": 18, "itemName": "NGO/Social Services" },
      { "id": 19, "itemName": "Office Automation" },
      { "id": 20, "itemName": "Others/Engg. Services/Service Providers" },
      { "id": 21, "itemName": "Petroleum/Oil and Gas/Projects/Infrastructure/Power/Non-conventional Energy" },
      { "id": 22, "itemName": "Printing/Packaging" },
      { "id": 23, "itemName": "Retailing" },
      { "id": 24, "itemName": "Security/Law Enforcement" },
      { "id": 25, "itemName": "Shipping/Marine" },
      { "id": 26, "itemName": "Software Services" },
      { "id": 27, "itemName": "Telecom Equipment/Electronics/Electronic Devices/RF/Mobile Network/Semi-conductor" },
      { "id": 28, "itemName": "Telecom/ISP" },
      { "id": 0, "itemName": "Not Specified" }
    ];

    this.staff_size = [
      { "id": 1, "itemName": "10 to 100" },
      { "id": 2, "itemName": "100 to 500" },
      { "id": 3, "itemName": "500 to 5000" },
      { "id": 4, "itemName": "Greater than 5000" },
      { "id": 0, "itemName": "Not Specified" }
    ]
    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class",
      position: 'bottom',
      maxHeight: '500px'
    };
  }
  onClose(event) {
    this.wipo_common_services_Service.getSubTechnicalFeilds(this.multiSelectedList(this.approvedAppForm.get('techFieldsID').value)).subscribe((res: any[]) => {
      this.subTechField = res;
    }, (error) => {
      this.loaderService.stopLoadingSpinner();
      this.toastr.error(error.statusText)
    }
    )
  }
  get f() {
    return this.approvedAppForm.controls;
  }
  get p() {
    return this.adminApprovedForm.controls;
  }
  onOrganizationLogoChange($event) {
    let file = $event.target.files[0];
    var rest = file.name.substring(0, file.name.lastIndexOf(".") + 1);
    var last = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length);    if (file.size < 200000) {
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
    this.approvedAppForm.controls['organizationLogo'].setValue(file ? file.name : '');
    }
    else {
      this.companyFlagSize = false;
      document.getElementById('sizeValidations').style.color = '#ffae42';
      this.approvedAppForm.controls['organizationLogo'].setValue(file ? '' : '');
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
    this.approvedAppForm.controls['uploadProjPic'].setValue(file ? file.name : '');
    }
    else {
      this.projectFlagSize = false;
      document.getElementById('sizeValidations1').style.color = '#ffae42';
      this.approvedAppForm.controls['uploadProjPic'].setValue(file ? '' : '');
    }
  }

  onSubmit() {

    this.submitted = true;
    // if(this.approvedAppForm.controls.website.invalid){
    //   this.website_validation=true;
    // }
    if (this.approvedAppForm.invalid) {
      let invalidFields = [].slice.call(document.getElementsByClassName('ng-invalid'));
      this.scrollToElement(invalidFields[1]);
      return;
    }
    
      this.approveFlag = true;
    this.rejectFlag=true;
    this.loaderService.startLoadingSpinner();
    if(this.ProjectImageData==""){
     this.ProjectImageData ="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"
     this.projectfiletype="png"
    }
    if(this.orgLogoData==""){
      this.orgLogoData="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"
      this.compLogofiletype="png"
    }
    var json = JSON.parse(localStorage.AdminData);
    this.approveApplicationData = {
       "applicantUserId":json.userId,
      "applicationRefId": this.approvedAppForm.get('appRefID').value,
      "countryId": this.multiSelectedList(this.approvedAppForm.get('affCountries').value),
      "countryIds": 0,
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
      ],
      "eoiRequestId": this.approvedAppForm.get('eoiReqID').value,
      "globalIssues": this.multiSelectedList(this.approvedAppForm.get('globalIssueID').value),
      "interestId": this.multiSelectedList(this.approvedAppForm.get('projInstID').value),
      "ipFieldIds": this.multiSelectedList(this.approvedAppForm.get('ipSubjID').value),
      "ipInterestId": 0,
      "party": {
        "address": this.approvedAppForm.get('add').value,
        "annualTurnOver": this.approvedAppForm.get('annTurnover').value,
        "applicantId": this.approvedAppForm.get('appRefID').value,
        "applicantType": this.approvedAppForm.get('appType').value,
        "businessSectorId": this.approvedAppForm.get('busSelector').value,
        "city": this.approvedAppForm.get('city').value,
        "companyProfile": this.approvedAppForm.get('cProfile').value,
        "contactNo": this.approvedAppForm.get('contactNo').value,
        "country": this.approvedAppForm.get('country').value,
        "email": this.approvedAppForm.get('email').value,
        "faxNo": this.approvedAppForm.get('faxNo').value,
        "firstName": this.approvedAppForm.get('fName').value,
        "lastName": this.approvedAppForm.get('lname').value,
        "mobileNo": this.approvedAppForm.get('mobileNo').value,
        "partyId": 0,
        "patnershipObjective": this.approvedAppForm.get('objective').value,
        "patnershipUn": this.approvedAppForm.get('partnership').value,
        "serviceProvided": this.approvedAppForm.get('serviceProvided').value,
        "staffSizeId": this.approvedAppForm.get('staffSize').value,
        "website": this.approvedAppForm.get('website').value,
      },
      "projectBenefits": this.approvedAppForm.get('projBenefit').value,
      "projectDescription": this.approvedAppForm.get('projDesciption').value,
      "projectPeriod": 0,
      "projectRisks": this.approvedAppForm.get('projRisk').value,
      "projectWebLink": this.approvedAppForm.get('projWeblink').value,
      "proposalTitle": this.approvedAppForm.get('projTitle').value,
      "proposalType": this.approved_proposalId,
      "proposedBudget": this.approvedAppForm.get('proposedBudget').value,
      "region": this.multiSelectedList(this.approvedAppForm.get('affRegionID').value),
      "sdgVos": this.multiSelectedList(this.approvedAppForm.get('sdgs').value),
      "subTechnicalField": this.getsubtechnicaldata(this.approvedAppForm.get('subTechFieldID').value),
      "technicalAssistance": this.multiSelectedList(this.approvedAppForm.get('techAssisID').value),
      "technicalField": this.multiSelectedList(this.approvedAppForm.get('techFieldsID').value),
      "typeOfProjectId": this.approvedAppForm.get('projTypeID').value,
    }
    this.adminApplicationService.registerProposal(this.approveApplicationData).subscribe((res: any[]) => {
      this.submitted = false;
      this.loaderService.stopLoadingSpinner();
      this.toastr.success("Data Updated Succesfully");
    }, (error) => {
      this.loaderService.stopLoadingSpinner();
      this.toastr.error(error.statusText);
    });
    this.disable = false;
  }

  scrollToElement(element) {
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  bindDropDown() {

  }

  //popup
  public openModalApprove(template: TemplateRef<any>) {
    this.adminApprovedForm = this.formBuilder.group({
      refID: [''], instName: [''], appAuthStatus: ['', Validators.required], authDate: ['']
      , eoiReqID: [''], projTitle: [''],
      eoiReqAuthStatus: ['', Validators.required], reason: ['', Validators.required], comment: [''],
      firstUser: [''], lastUser: ['']
    });
    this.authStatus = [
      { "id": 2, "itemName": "Approve" }
    ];
    this.reasonDropdown = [
      { "id": 9, "itemName": "Approved as every details are proper" },
      { "id": 10, "itemName": "Approved as known Applicant " }

    ]
    this.viewPopUpData();
    this.modalRef = this.modalService.show(template, { class: "modal-dialog modal-lg" });

  }
  public openModalReject(template: TemplateRef<any>) {
    this.adminApprovedForm = this.formBuilder.group({
      refID: [''], instName: [''], appAuthStatus: ['', Validators.required], authDate: ['']
      , eoiReqID: [''], projTitle: [''],
      eoiReqAuthStatus: ['', Validators.required], reason: ['', Validators.required], comment: [''],
      firstUser: [''], lastUser: ['']
    });
    this.authStatus = [
      { "id": -1, "itemName": "Rejected" }
    ];
    this.reasonDropdown = [
      { "id": 1, "itemName": "Authorization Pending for Applicant & EOI Request" },
      { "id": 2, "itemName": "Authorization Pending for Applicant" },
      { "id": 3, "itemName": "Authorization Pending for EOI Request" },
      { "id": 4, "itemName": "Rejected due to incomplete information" },
      { "id": 5, "itemName": "Rejected due to suspicious Applicant" },
      { "id": 6, "itemName": "Rejected due to unverified data of Applicant or EOI" },
      { "id": 7, "itemName": "Rejected due to unacceptable request" },
      { "id": 8, "itemName": "Rejected due to any other reason" }
    ]
    //reject
    this.viewPopUpData();
    this.modalRef = this.modalService.show(template, { class: "modal-dialog modal-lg" });

  }
  viewPopUpData() {
    var json = JSON.parse(localStorage.AdminData);
    this.submittedPopUp = false;
    this.loaderService.startLoadingSpinner();
    this.adminApplicationService.getApprovedPopUpData(this.selectedEoiId).subscribe((res) => {
      this.authStatusId = res.eoiAuthStatusId
      this.partyID = res.partyId;
      this.userID = res.userId;
      this.proposalID = res.proposalId;
      var date = new Date(res.authorizationDate);
      this.formatedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      var date_ = formatDate(new Date(), 'dd/MM/yyyy', 'en');
      this.currentDate = date_
      if (this.authStatusId == null) {
        this.overalAuthStatus = "Not Processed";
        this.adminApprovedForm.patchValue({"appAuthStatus":""});
      }
      else {
        this.adminApprovedForm.patchValue({ "appAuthStatus":this.authStatusId});
        this.overalAuthStatus = res.eoiAuthStatusIdDesc;
      }
      if(res.eoiAuthStatusId==null)
      {
        this.adminApprovedForm.patchValue({"eoiReqAuthStatus":""});
      }
      else{
        this.adminApprovedForm.patchValue({"eoiReqAuthStatus":res.eoiAuthStatusId});
      }
      if(res.statusReasonId==null)
      {
        this.adminApprovedForm.patchValue({"reason":""});
      }
      else{
        this.adminApprovedForm.patchValue({"reason":res.statusReasonId});
      }
      this.adminApprovedForm.patchValue({
        "refID": this.applicantRefId,
        "instName": res.instOrganisationName,
        "authDate": this.currentDate,
        "eoiReqID": this.selectedEoiId,
        "projTitle": res.projectTitle,
        "comment": res.comments,
        "firstUser": res.createUserId,
        "lastUser": json.userId
      })

      this.loaderService.stopLoadingSpinner();

    }, (error: any) => {
      this.loaderService.stopLoadingSpinner();
      this.toastr.error(error.statusText);
    });
  }
  onSubmitPopUpData(id:number) {
    this.submittedPopUp = true;  
    if (this.adminApprovedForm.invalid) {
        return;
    }
    this.approveFlag = false;
    this.loaderService.startLoadingSpinner();
    var data =
      {
        "applicantrefId": this.applicantRefId,
        "authStatusId": this.adminApprovedForm.get('appAuthStatus').value,
        "eoiAuthStatusId": this.adminApprovedForm.get('eoiReqAuthStatus').value,
        "reasonStatusId": this.adminApprovedForm.get('reason').value,
        "eoiRequestId": this.selectedEoiId,
        "comments": this.adminApprovedForm.get('comment').value,
        "firstUser":this.adminApprovedForm.get('firstUser').value,
        "lastUser":this.adminApprovedForm.get('lastUser').value
      }
    this.adminApplicationService.submitApprovedPopUpData(data).subscribe((res: any) => {
      this.submittedPopUp  = false;
      this.rejectFlag = true;
      if(id==1){
      this.eoiStatusImage = "assets/images/approved.jpg";
      }
      else{
        this.eoiStatusImage = "assets/images/reject.jpg";
      }
      this.loaderService.stopLoadingSpinner();
      this.modalRef.hide();
      this.toastr.success("Data Updated Succesfully");

    }, (error) => {
      this.loaderService.stopLoadingSpinner();
      this.toastr.error(error.statusText);
    });
    
  }
  getMultiDropList() {
    this.wipo_common_services_Service.getAllCriteria().subscribe((res) => {
      this.projIntrested = res.projectInerests;
      this.affectedCountries = res.countryVo;
      this.globalIssues = res.globalIssuesVo;
      this.techField = res.technicalFieldVo;
      this.ipField = res.ipSubjectArea;
      this.techAssistance = res.technicalAssistance;
      this.affRegion = res.region;
      this.sdg = res.sdgs;
    }, (error) => {
      this.loaderService.stopLoadingSpinner();
      this.toastr.error(error.statusText);
    });
  }
  multiSelectedList(criteriaArray: any) {
    this.selectedCriteriaId = [];
    criteriaArray.forEach(element => {
      this.selectedCriteriaId.push(element.id);
    });
    return this.selectedCriteriaId;
  }
  getsubtechnicaldata(criteriaArray) {
    this.subTechField = [];
    criteriaArray.forEach(element => {
      this.subTechField.push({ "subtechnicalId": element.id, "technicalId": element.technicalFieldId })
    })
    return this.subTechField;
  }
  //view approve data
  viewDetails() {
    let selectedEoiId = 0;
    this.route.params.subscribe(params => {
      if(!this.loggedInAdminService.isAdminLoggedIn ){
        this.router.navigate(['admin-login']); 
      }
      else{
      this.rejectFlag = false;
      this.eoiStatusImage = "assets/images/not_processed.jpg";
      this.approveFlag = false;
      selectedEoiId = params['eoiId'];
      this.selectedEoiId = selectedEoiId;
      if (selectedEoiId != 0) {
        this.adminApplicationService.getAdminApprove(selectedEoiId).subscribe((res: any) => {
          this.getAdminApproveObj = res;
          var date = new Date(this.getAdminApproveObj.requestDate);
          this.formatedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
          var date_ = formatDate(new Date(), 'dd/MM/yyyy', 'en');
          this.currentDate = date_
          this.loaderService.stopLoadingSpinner();
          this.approved_proposalId = res.proposalType;
          if (this.approved_proposalId == "Need") {
            this.approved_proposalId = 2;
          }
          else if (this.approved_proposalId == "Offer") {
            this.approved_proposalId = 1;
          }
          else if (this.approved_proposalId == "Response to need") {
            this.approved_proposalId = 3;
          }
          else {
            this.approved_proposalId = 4;
          }

          this.applicantRefId = res.applicantRefId;
          this.approvedAppForm.patchValue({
            "appRefID": res.applicantRefId,
            "eoiReqID": res.eoiRequestId,
            "ipAddress": res.ipAddress,
            "reqDate": this.currentDate,
            "instName": res.instituationOrganisationName,
            "appType": res.aplicantType,
            "fName": res.contactFirstName,
            "lname": res.contactLastName,
            "add": res.address,
            "city": res.city,
            "country": res.countryName,
            "contactNo": res.contactNumber,
            "mobileNo": res.contactNumber,
            "email": res.email,
            "faxNo": res.faxNumber,
            "website": res.website,
            "cProfile": res.cProfile,
            "serviceProvided": res.serviceDescription,
            "busSelector": res.businessSectorId,
            "staffSize": res.staffSize,
            "objective": res.patnershipObjective,
            "partnership": res.earlierPatnershipWithUN,
            "projTitle": res.projectTitle,
            "proType": res.proposalType,
            "projDesciption": res.projDesciption,
            "projWeblink": res.projectWeblink,
            "annTurnover": res.annualTurnOverId,
            "projBenefit": res.projectBenefits,
            "projRisk": res.projectRisks,
            "proposedBudget": res.proposalBudget,
            "projTypeID": res.typeOfProjectId,
          });
          if (res.annualTurnOverId == null) {
            this.approvedAppForm.patchValue({
              "annTurnover": 0,
              "busSelector": 0,
              "staffSize": 0,
            })
          }
          if (res.eoiCompanyDocumentVo != null) {
            this.companyFlagSize=true;
            this.orgLogoData = res.eoiCompanyDocumentVo.eoiDocument;
            this.companyLogo = "data:image/png;base64," + res.eoiCompanyDocumentVo.eoiDocument;
            this.compLogofiletype = res.eoiCompanyDocumentVo.fileTypeExt;
          }
          else {
            this.orgLogoData = "";
            this.companyFlagSize=false;
            this.companyLogo = "";
            this.compLogofiletype = "";
          }
          if (res.eoiProjectDocumentVo != null) {
            this.projectFlagSize=true;
            this.ProjectImageData = res.eoiProjectDocumentVo.eoiDocument;
            this.projectLogo = "data:image/png;base64," + res.eoiProjectDocumentVo.eoiDocument;
            this.projectfiletype = res.eoiProjectDocumentVo.fileTypeExt;
          }
          else {
            this.projectFlagSize=false;
            this.ProjectImageData = "";
            this.projectLogo = "";
            this.projectfiletype = "";
          }
          //multidropdown data set
          this.selected_projIntrested = res.patnershipValues;
          this.selected_affectedCountries = res.affCountries;
          this.selected_sdg = res.sdgVos;
          this.selected_ipFields = res.ipInterestArea;
          this.selected_countries = res.countryValue;
          this.selected_techAssistances = res.techAssist;
          this.selected_techFields = res.techFields;
          this.selected_subTechFields = res.subTechField;
          this.selected_affRegion = res.region;
          this.selected_globalIssues = res.globalIssues;
        });
      }
    }
    });
    this.loaderService.stopLoadingSpinner();
  }
  printApproveTab() {
    window.print()
  }

}
