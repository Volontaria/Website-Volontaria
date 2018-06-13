import {animate, state, style, transition, trigger} from '@angular/animations';

export class Animations {
  public static slideInOut = trigger('display', [
    state('inactive', style({
      display: 'none',
    })),
    state('active',   style({
      display: 'block',
    })),
    transition('inactive => active', animate('100ms ease-in')),
    transition('active => inactive', animate('100ms ease-out'))
  ]);
}
