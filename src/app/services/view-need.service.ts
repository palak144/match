import { Injectable } from '@angular/core';
import {CommonServiceService} from 'src/app/services/common-service.service'
@Injectable({
  providedIn: 'root'
})
export class ViewNeedService {
viewNeedUrl="/getDonerById/"
  constructor(private restapi:CommonServiceService) { }
  getNeed(proposalId:number,proposalTypeId:number,eoiRequestId:number)
{
  return this.restapi.get(this.viewNeedUrl+proposalId+"/"+proposalTypeId+"/"+eoiRequestId);
}
}
