import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

 //baseUrl:string = "https://www3.wipo.int/match";

  constructor(private httpClient : HttpClient ) {}
  
  //Api Calls

  get(parameters:string): Observable<any>{ 
    return this.httpClient.get(environment.baseUrl+parameters);
    
 }
  post (parameters:string,data:any): Observable<any> {
    return this.httpClient.post(environment.baseUrl+parameters,data);
  }
 
  put (parameters:string,id:any, data:any): Observable<any> {
    return this.httpClient.put(environment.baseUrl+parameters + id, data)
  }
  
  delete (parameters:string,id:any): Observable<any> {
    return this.httpClient.delete<any>( environment.baseUrl+parameters + id);
  }
}
