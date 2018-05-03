import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CycleService } from '../../../services/cycle.service';
import { Cycle } from '../../../models/cycle';
import { NgForm } from '@angular/forms';
import {MyModalService} from '../../../services/my-modal/my-modal.service';
import {AuthenticationService} from '../../../services/authentication.service';


@Component({
  selector: 'app-admin-cycles',
  templateUrl: './admin-cycles.component.html',
  styleUrls: ['admin-cycles.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminCyclesComponent implements OnInit {

  cycles: Cycle[];

  constructor(private cycleService: CycleService,
              private myModals: MyModalService,
              private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.cycleService.getCycles().subscribe(
      data => {
        this.cycles = data.results.map(c => new Cycle(c) );
      }
    );
  }

  private createCycle(form: NgForm) {
    console.log(form.value);
    this.cycleService.createCycle(form.value).subscribe(
      data => {
        console.log('sucess');
        form.resetForm();
      },
      err => {
        console.log(err);
        this.myModals.get('create cycle').toggle();
      }
    );
  }

  private isAdmin(): boolean {
    return this.authenticationService.isAdmin();
  }
}
