import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Directive({
  selector: '[appHasPermissions]'
})
export class PermissionDirective implements OnInit {

  @Input() hasPermissions: string[];
  element: ElementRef = null;

  constructor(element: ElementRef,
              private authenticationService: AuthenticationService) {
    this.element = element;
  }

  ngOnInit() {
    if (!this.authenticationService.hasPermissions(this.hasPermissions)) {
      this.element.nativeElement.style.display = 'none';
    }
  }
}
