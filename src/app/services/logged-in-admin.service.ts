import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedInAdminService {

  visible: boolean;
  isAdminLoggedIn : boolean;
  constructor() { this.visible = false; this.isAdminLoggedIn = false }

  hide() { this.visible = false; }

  show() { this.visible = true; }
}
