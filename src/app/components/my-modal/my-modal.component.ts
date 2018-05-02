import { Component, OnInit, Input, ViewChild, DoCheck } from '@angular/core'
import { MyModalService } from '../../services/my-modal/my-modal.service';


@Component({
  selector: 'my-modal',
  styleUrls: ['my-modal.component.scss'],
  templateUrl: './my-modal.component.html'
})
export class MyModalComponent implements OnInit, DoCheck {
  @Input() name: string;
  @Input() title: string;
  @ViewChild('modalContent') modalContent;

  private show: boolean = false;
  // store elements to notify
  private notify = [];

  constructor(private myModals: MyModalService) { }

  ngOnInit() {
    this.myModals.set(this.name, this)
  }

  clickOverlay(event: Event) {
    const target = (event.target as HTMLElement);

    if (target.classList.contains('modal-component')) {
      this.toggle()
    }
  }

  toggle() {
    this.show = !this.show;

    if (this.show) {
      document.addEventListener('keyup', this.escapeListener)
    } else {
      document.removeEventListener('keyup', this.escapeListener)
    }

    this.notify = [].slice.call(this.modalContent.nativeElement.children)
  }

  ngAfterContentChecked() {
    if (this.notify.length === 0) {
      return
    }

    const event = this.createEvent(this.show ? 'modalOpen' : 'modalClose');
    let toNotify;

    while(toNotify = this.notify.shift()) {
      toNotify.dispatchEvent(event)
    }
  }

  ngDoCheck() { }

  private createEvent(name) {
    const event = document.createEvent('Events');
    event.initEvent(name, true, true);
    return event
  }


  private escapeListener = (event: KeyboardEvent) => {
    if (event.which === 27 || event.keyCode === 27) {
      this.show = false;
    }
  }
}
