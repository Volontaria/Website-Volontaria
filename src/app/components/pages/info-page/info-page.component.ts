import {Component} from '@angular/core';
import { Animations } from './animations';
import { DATA } from './infos';

@Component({
  templateUrl: 'info-page.component.html',
  selector: 'app-info',
  styleUrls: ['info-page.component.scss'],
  animations: [ Animations.slideInOut ]
})
export class InfoPageComponent {
  public state: string;

  private data = DATA;

  constructor() {
    this.state = 'inactive';

  }

  toggleState(element) {
    element.state = element.state === 'active' ? 'inactive' : 'active';
  }
}
