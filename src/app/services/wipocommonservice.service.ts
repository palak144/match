import { Injectable } from '@angular/core';
import {CommonServiceService} from 'src/app/services/common-service.service'

@Injectable({
  providedIn: 'root'
})
export class Wipo_common_services_Service {
  ApplicantAdminType:boolean;
  countryUrl="/getAllCountry/all";
  organisationUrl="/getAllSupporterOrganizations/all";
  partyUrl="/getPartyType";
  getAllCriteriaUrl = "/getAllCriterias/";
  getSubTechnicalFeildsUrl="/getSubTechCriterias/";
  getSearchUrl="/getSearchResult/";
  constructor(
    private restapi:CommonServiceService
    ) { }
  getCountry()
{
  return this.restapi.get(this.countryUrl);
}
getOrganisations()
{
  return this.restapi.get(this.organisationUrl);
}
getParty()
{
return this.restapi.get(this.partyUrl);
}
getAllCriteria(){
  return this.restapi.get(this.getAllCriteriaUrl);
}
getSubTechnicalFeilds(techFieldId:any){
  return this.restapi.get(this.getSubTechnicalFeildsUrl+techFieldId);
}
getSearchResults(data){
  return this.restapi.post(this.getSearchUrl,data);
}
getApplicantAdminType()
{
return this.ApplicantAdminType;
}
setApplicantAdminType(data:boolean)
{
this.ApplicantAdminType=data;
} 
}
