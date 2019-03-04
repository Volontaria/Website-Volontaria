import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MyModalService } from '../../services/my-modal/my-modal.service';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.scss']
})
export class MyModalComponent implements OnInit {

  @Input() name: string;
  @Input() title: string;
  @Input() typeModal: string;
  @Input() button2Label: string;
  @Input() maxWidth = '95%';
  @Input() activated = true;

  @ViewChild('modalContent') modalContent;

  @Output() button1: EventEmitter<any> = new EventEmitter();
  @Output() button2: EventEmitter<any> = new EventEmitter();

  show = false;
  isModalInformation: boolean;
  isModalForm: boolean;

  errorMessage: string;

  constructor(private myModals: MyModalService) {
  }

  ngOnInit() {
    this.isModalInformation = this.typeModal === 'information';
    this.isModalForm = this.typeModal === 'form';

    this.myModals.set(this.name, this);
  }

  clickOverlay(event: Event) {
    const target = (event.target as HTMLElement);

    if (target.classList.contains('modal-component')) {
      this.toggle();
    }
  }

  setErrorMessage(value: string) {
    this.errorMessage = value;
  }

  toggle() {
    this.show = !this.show;

    if (this.show) {
      document.addEventListener('keyup', this.escapeListener);
    } else {
      document.removeEventListener('keyup', this.escapeListener);
      this.errorMessage = '';
    }
  }

  private escapeListener = (event: KeyboardEvent) => {
    if (event.key === 'Escape' || event.key === 'Esc' /* IE 11 */ ) {
      this.show = false;
    }
  }

  clickButton1(): void {
    this.button1.emit(null);
    this.toggle();
  }

  clickButton2(): void {
    this.button2.emit(null);
  }

}
