import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { finalize, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchField } from '../models/search-field';
import { ResponseApi } from '../models/api';

export class CustomDataSource<T> extends DataSource<T> {
  paginator: MatPaginator;
  sort: MatSort;

  private dataSubject = new BehaviorSubject<T[]>(null);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  public noData$ = this.connect().pipe(
    map((data: T[]) => {
      return !!data && data.length === 0;
    })
  );

  public lengthData$ = this.connect().pipe(
    map((data: T[]) => {
      return !!data ? data.length : 0;
    })
  );

  public length = 0;

  constructor(
    private dataService,
    private searchFunction: any,
    private defaultSearchField?: SearchField
  ) {
    super();
  }

  loadData(pSearchField: SearchField = null) {
    this.loadingSubject.next(true);

    let searchFields: SearchField = {};

    if (this.paginator) {
      const offset: number = this.paginator.pageSize * this.paginator.pageIndex;
      const limit: number = this.paginator.pageSize;

      searchFields = {
        limit: limit.toString(),
        offset: offset.toString(),
      };
    }

    if (this.defaultSearchField) {
      searchFields = Object.assign({}, this.defaultSearchField, searchFields);
    }

    if (pSearchField) {
      searchFields = Object.assign({}, pSearchField, searchFields);
    }
    const ordering = this.getSortingParam();
    if (ordering) {
      searchFields.ordering = ordering;
    }

    this.dataService[this.searchFunction](searchFields)
      .pipe(
        finalize(() => this.loadingSubject.next(false)),
        tap((responseApi: ResponseApi<T>) => {
          this.length = responseApi.count;
        }),
        map((responseApi: ResponseApi<T>) => responseApi.results)
      )
      .subscribe((data: T[]) => this.dataSubject.next(data));
  }

  connect(): Observable<T[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }

  getSortingParam() {
    if (this.sort?.active) {
      let order = '';
      if (this.sort.direction === 'desc') {
        order = '-';
      }
      return `${order}${this.sort.active}`;
    }
  }
}
