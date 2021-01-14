import { Injectable } from "@angular/core";  
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";  
import { Observable } from "rxjs";  
import { ViewNeedService } from "src/app/services/view-need.service";  

  
@Injectable()  
export class ViewNeedResolve {  
  constructor(private viewNeedService: ViewNeedService) {}  
  
  resolve(route: ActivatedRouteSnapshot): Observable<any> { 
    var selectedNeed=JSON.parse(localStorage.getItem('selectedNeed'));
   return this.viewNeedService.getNeed(selectedNeed.proposalId,selectedNeed.proposalTypeId,selectedNeed.eoiRequestId)
}
  
}  
