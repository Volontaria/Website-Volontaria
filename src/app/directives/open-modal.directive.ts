import {Directive, HostListener, Input} from '@angular/core';
import {ModalService} from "../services/modal.service";

@Directive({
  selector: '[appOpenModal]'
})
export class OpenModalDirective {
  @Input() appOpenModal: string;

  constructor(private modalService: ModalService) {
  }

  @HostListener('click') onClick() {
    const modal = this.modalService.get(this.appOpenModal);

    if (!modal) {
      console.error('No modal named %s', this.appOpenModal);
      return;
    }

    modal.toggle();
  }
}
