import { Directive, HostListener, Input } from '@angular/core';
import { MyModalService } from '../services/my-modal/my-modal.service';

@Directive({
  selector: '[myModalOpen]'
})
export class MyModalOpenDirective {
  @Input() myModalOpen: string;

  constructor(private myModals: MyModalService) {
  }

  @HostListener('click') onClick() {
    const modal = this.myModals.get(this.myModalOpen);

    if (!modal) {
      console.error('No modal named %s', this.myModalOpen);
      return
    }

    modal.toggle()
  }
}
