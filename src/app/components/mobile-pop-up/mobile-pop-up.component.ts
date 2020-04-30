import { Component, OnInit } from '@angular/core';
import {PopUpMobileService} from '../../services/pop-up-mobile.service';

@Component({
  selector: 'app-mobile-pop-up',
  templateUrl: './mobile-pop-up.component.html',
  styleUrls: ['./mobile-pop-up.component.scss']
})
export class MobilePopUpComponent implements OnInit {

  get displayPopUp() {
    return !this.popUpMobileService.hide;
  }

  constructor(private popUpMobileService: PopUpMobileService) {
  }

  ngOnInit() {
  }

  closePopUp() {
    this.popUpMobileService.hide = true;
  }

}
