import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CellService } from '../../../services/cell.service';
import { Cell } from '../../../models/cell';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-cells',
  templateUrl: './admin-cells.component.html',
  styleUrls: ['admin-cells.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminCellsComponent implements OnInit {

  cells: Cell[];

  constructor(private cellService: CellService,
              private router: Router) {}

  ngOnInit() {
    this.cellService.getCells().subscribe(
      data => {
        this.cells = data.results.map(c => new Cell(c) );
      }
    );
  }

  visitCell(idCell) {
    this.router.navigate(['/admin/cells/' + idCell]);
  }
}
