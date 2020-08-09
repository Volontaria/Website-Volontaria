import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { merge } from 'rxjs';
import { SearchField } from '../../models/search-field';
import { CustomDataSource } from '../../utils/CustomDataSource';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
})
export class CustomTableComponent<T = any> implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<T>;
  dataSource: CustomDataSource<T>;

  apiService: any;
  searchFunction: any;

  constructor() {}

  ngOnInit(): void {
    this.initTable();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.table.dataSource = this.dataSource;

    let mergeEvent;

    if (this.sort) {
      this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
      mergeEvent = merge(this.sort.sortChange);
    }

    if (this.paginator) {
      if (mergeEvent) {
        mergeEvent = merge(mergeEvent, this.paginator.page);
      }
      mergeEvent = this.paginator.page;
    }

    if (mergeEvent) {
      mergeEvent.subscribe(() => {
        this.loadDataPage();
      });
    }

    this.loadDataPage();
  }

  get searchField(): SearchField {
    return null;
  }

  initTable() {
    this.dataSource = new CustomDataSource(
      this.apiService,
      this.searchFunction,
      this.searchField
    );
  }

  loadDataPage() {
    this.dataSource.loadData();
  }
}
