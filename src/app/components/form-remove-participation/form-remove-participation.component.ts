import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'form-remove-participation',
  templateUrl: './form-remove-participation.component.html',
  styleUrls: ['form-remove-participation.component.scss'],
})
export class FormRemoveParticipation {
  @Input() foo: string;

  @HostListener('modalOpen') onModalOpen() { }
}
