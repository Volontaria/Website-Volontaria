import {Component, OnInit, Input, ViewChild, EventEmitter, Output} from '@angular/core';
import {MyModalService} from '../../services/my-modal/my-modal.service';


@Component({
  selector: 'my-modal',
  styleUrls: ['my-modal.component.scss'],
  templateUrl: './my-modal.component.html'
})
export class MyModalComponent implements OnInit {
  @Input() name: string;
  @Input() title: string;
  @Input() button2Label: string;
  @Input() typeModal: string;
  @ViewChild('modalContent') modalContent;

  @Output() button1: EventEmitter<any> = new EventEmitter();
  @Output() button2: EventEmitter<any> = new EventEmitter();

  private show = false;
  // store elements to notify
  private notify = [];

  constructor(private myModals: MyModalService) {
  }

  ngOnInit() {
    this.myModals.set(this.name, this);
  }

  clickOverlay(event: Event) {
    const target = (event.target as HTMLElement);

    if (target.classList.contains('modal-component')) {
      this.toggle();
    }
  }

  toggle() {
    this.show = !this.show;

    if (this.show) {
      document.addEventListener('keyup', this.escapeListener);
    } else {
      document.removeEventListener('keyup', this.escapeListener);
    }
  }

  private createEvent(name) {
    const event = document.createEvent('Events');
    event.initEvent(name, true, true);
    return event;
  }


  private escapeListener = (event: KeyboardEvent) => {
    if (event.which === 27 || event.keyCode === 27) {
      this.show = false;
    }
  }

  private clickButton1(): void {
    this.button1.emit(null);
    this.toggle();
  }

  private clickButton2(): void {
    this.button2.emit(null);
    this.toggle();

  }
}
