import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() name: string;
  @Input() autoClose = false;
  @Input() show = false;
  @Input() maxWidth: string = '600px';

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  constructor(private modalService:ModalService) { }

  ngOnInit(): void {
    this.modalService.set(this.name, this);
  }

  toggle() {
    this.show = !this.show;

    if (this.show) {
      document.addEventListener('keyup', this.escapeListener);
    } else {
      this.onClose.emit(null);
      document.removeEventListener('keyup', this.escapeListener);
    }
  }

  private escapeListener = (event: KeyboardEvent) => {
    if (event.which === 27 || event.keyCode === 27) {
      this.show = false;
    }
  }

  close() {
    this.show = false;
  }

  clickOverlay(event: Event) {
    const target = (event.target as HTMLElement);

    if (target.classList.contains('modal-component')) {
      this.toggle();
    }
  }


}
