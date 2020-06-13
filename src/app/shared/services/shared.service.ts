import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private location:Location) { }

  back(){
    this.location.back();
  }

  redirectToExternal(url: string) {
    if (url !== '' || url !== undefined) {
      window.open(url, '_blank');
    }
  }
}
