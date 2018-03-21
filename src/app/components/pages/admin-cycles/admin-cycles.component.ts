import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CycleService } from '../../../services/cycle.service';
import { Cycle } from '../../../models/cycle';


@Component({
  selector: 'app-admin-cycles',
  templateUrl: './admin-cycles.component.html',
  styleUrls: ['admin-cycles.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminCyclesComponent implements OnInit {

  cycles: Cycle[];

  constructor(private cycleService: CycleService) {}

  ngOnInit() {
    this.cycleService.getCycles().subscribe(
      data => {
        this.cycles = data.results.map(c => new Cycle(c) );
      }
    );
  }
}
