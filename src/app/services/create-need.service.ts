import { Injectable } from '@angular/core';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class CreateNeedService {

  createNeedUrl="/registerDonorOffer/form/";
  updateOfferUrl="/updateDonorOffer/form/";
  viewNeedUrl="/getSeekerDonordata/" ;
   constructor(private restapi:CommonServiceService) { }
 
  createNeedDetails(data){
  return this.restapi.post(this.createNeedUrl,data);
  }
  
  getNeedDetails(eoireqid,proposalid)
  {
    return this.restapi.get(this.viewNeedUrl+eoireqid+"/"+proposalid);
 }
 updateOfferDetails(id:number,data:any)
 {
   return this.restapi.put(this.updateOfferUrl,id,data);
 }
}
