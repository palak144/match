import { Injectable } from '@angular/core';
import {CommonServiceService} from 'src/app/services/common-service.service'

@Injectable({
  providedIn: 'root'
})

export class AdminApplicationService {
  registerProposalFormUrl="/registerProposalDetail/form/"
  constructor(private restapi:CommonServiceService) { }

  getUnprocessApplication()
  { 
    return this.restapi.get("/adminUnProcessedApp/");
  }

  getProcessApplication(){
    return this.restapi.get("/getAllApprovedApplications/");
  }

  postPublishApplication(requestId:number,action:string,applicantrefId:number)
  {
    if(action == "publish"){
      return this.restapi.post("/Published/",{"eoiRequestId":requestId});
    }
    else if(action == "delete"){
      return this.restapi.post("/Delete/",{"eoiRequestId":requestId,"applicantrefId":applicantrefId});
    }
    else if(action == "reject"){
      return this.restapi.post("/Rejected/",{"eoiRequestId":requestId});
    }
  }
  registerProposal(data)
  {
    return this.restapi.post(this.registerProposalFormUrl,data)
  }
  getPublisedApplication(){    
    return this.restapi.get("/getAllPublishedApplications/");
  }

  getRejectedApplication(){    
    return this.restapi.get("/getAllRejectededApplications/");
  }
  getAdminApprove(id){  
    return this.restapi.get("/adminApprove/"+id);
  }
  getAllUpdatedAfterRejectionApplications(){
    return this.restapi.get("/getAllUpdatedAfterRejectionApplications")
  }
  getApprovedPopUpData(id:number){
    return this.restapi.get("/adminApproveData/"+id)
  }
  submitApprovedPopUpData(data:any)
  {
    return this.restapi.post("/adminApproveForm/",data)
  }
  
}
