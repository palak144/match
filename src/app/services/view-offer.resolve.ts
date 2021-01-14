import { Injectable } from "@angular/core";  
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";  
import { Observable } from "rxjs";  
import { ViewOfferService } from "src/app/services/view-offer.service";  

  
@Injectable()  
export class ViewOfferResolve implements Resolve<any> {  
  
  constructor(private viewOfferService: ViewOfferService) {}  
  
  resolve(route: ActivatedRouteSnapshot): Observable<any> { 
    var selecteddonor=JSON.parse(localStorage.getItem('selectedOffer'));
 
   return this.viewOfferService.getOffer(selecteddonor.proposalId,selecteddonor.proposalTypeId,selecteddonor.eoiRequestId)

}

  
}  
