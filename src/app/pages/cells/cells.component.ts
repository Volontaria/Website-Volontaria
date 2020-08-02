import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ResponseApi } from '../../models/api';
import { CellService } from '../../services/cell.service';
import { Cell } from '../../models/cell';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cells',
  templateUrl: './cells.component.html',
  styleUrls: ['./cells.component.scss'],
})
export class CellsComponent implements OnInit {
  cellList$: Observable<Cell[]>;
  cellList: MatTableDataSource<Cell>;

  displayedColumns: string[] = ['name'];

  constructor(private cellService: CellService, private router: Router) {}

  ngOnInit(): void {
    this.getCells();
  }

  getCells(): void {
    this.cellList$ = this.cellService.list().pipe(
      map((responseApi: ResponseApi<Cell>) => {
        return responseApi.results;
      })
    );
    this.cellList$.subscribe((cells: Cell[]) => {
      if (cells.length === 1) {
        this.router.navigate(['/events/' + cells[0].id]);
      } else {
        this.cellList = new MatTableDataSource(cells);
      }
    });
  }
}
