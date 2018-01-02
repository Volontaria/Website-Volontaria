import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Cycle} from "../../../models/cycle";
import {CycleService} from "../../../services/cycle.service";

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent {

  cycles: Cycle[];

  constructor(private cycleService:CycleService) {
    this.cycleService.getCycles().subscribe(
      data => {
        this.cycles = data.results.map(c => new Cycle(c) );
      }
    );
  }

}
