import { Injectable } from '@angular/core';

@Injectable()
export class PopUpMobileService {

  localStorageKey = 'popupShown';

  constructor() { }

  get hide(): boolean {
    return JSON.parse(localStorage.getItem(this.localStorageKey));
  }

  set hide(b: boolean) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(b));
  }
}
