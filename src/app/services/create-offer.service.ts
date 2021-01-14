import { Injectable } from '@angular/core';
import { CommonServiceService } from './common-service.service';

@Injectable({
  providedIn: 'root'
})
export class CreateOfferService {

  createOfferUrl="/registerDonorOffer/form/";
  updateOfferUrl="/updateDonorOffer/form/";
  viewOfferUrl="/getSeekerDonordata/"
  constructor(private restapi:CommonServiceService) { }
   getofferDetails(eoireqid,proposalid)
 {
   return this.restapi.get(this.viewOfferUrl+eoireqid+"/"+proposalid);
}
createOfferDetails(data){
return this.restapi.post(this.createOfferUrl,data);
}
updateOfferDetails(id:number,data:any,rejectflag:any)
{
  return this.restapi.put(this.updateOfferUrl+id+"/",rejectflag,data);
}
}
