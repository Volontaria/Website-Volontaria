import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CellService } from '../../services/cell.service';
import { Cell } from '../../models/cell';
import { Router } from '@angular/router';
import { CustomTableComponent } from '../../shared/custom-table/custom-table.component';

@Component({
  selector: 'app-cells',
  templateUrl: './cells.component.html',
  styleUrls: ['./cells.component.scss'],
})
export class CellsComponent extends CustomTableComponent<Cell>
  implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name'];

  constructor(private cellService: CellService, private router: Router) {
    super();
    this.apiService = this.cellService;
    this.searchFunction = 'list';
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.dataSource.connect().subscribe((cells: Cell[]) => {
      if (cells?.length === 1) {
        this.router.navigate(['/', 'events', cells[0].id]).then();
      }
    });
  }
}
