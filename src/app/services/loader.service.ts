import { Injectable } from '@angular/core';
import {Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) { }
  startLoadingSpinner() {
    this.ng4LoadingSpinnerService.show();
  }
    
  stopLoadingSpinner()
  {
      this.ng4LoadingSpinnerService.hide();
    }
  } 

