import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChampionsWallService {
private baseUrl = "assets/JSON/wall-of-champions.json"
  constructor(public _http:HttpClient ) { }

  getChampionsLogo(){
    return this._http.get(this.baseUrl);
  }
  
}
