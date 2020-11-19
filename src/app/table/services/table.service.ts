import { Injectable, OnDestroy, QueryList } from '@angular/core';

import { Observable, Subject, ReplaySubject, BehaviorSubject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';

import { Pagination } from '../pagination/pagination';
import { IPhoneData } from '../interfaces/phone-data';
import { ConfigTablePagination, IConfigFormat, IResponseFormat, IQueryParams } from '../interfaces/response-format';
import { MTableColumnDirective } from '../directives/m-table-column/m-table-column.directive';

import { IConfigTableSort } from './../interfaces/response-format';
import { SortTableService } from './sort-table.service';

@Injectable()
export class TableService implements OnDestroy {

  private _dataOfFetch$ = new BehaviorSubject<IPhoneData[]>(null);

  private _fetch$ = new Subject<void>();

  private _loadingForData$ = new BehaviorSubject<boolean>(false);

  private _destroy$ = new ReplaySubject<number>(1);

  private _config: IConfigFormat;

  private _paginator: Pagination;

  constructor(private _sort: SortTableService) {
    this._listenFetch();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public get paginator(): Pagination {
    return this._paginator;
  }

  public get sortableColumns(): string[] {
    return this._sort.columns;
  }

  public get selectedSortColumn$(): Observable<IConfigTableSort> {
    return this._sort.column$;
  }

  public get dataFromFetch$(): Observable<IPhoneData[]> {
    return this._dataOfFetch$.asObservable();
  }

  public get paginatorEvents$(): Observable<IQueryParams> {
    return this._paginator.change$;
  }

  public get loading$(): Observable<boolean> {
    return this._loadingForData$.asObservable();
  }


  public setConfig(value: IConfigFormat): void {
    this._config = value;
    this._initParams(value);
  }

  public getSortableColumns(allColumns: QueryList<MTableColumnDirective>): string[] {
    this._sort.chooseColumns(allColumns);

    return this.sortableColumns;
  }

  private _initParams(params?: IConfigFormat): void {
    this._initPaginator(params?.pagination);
    this._initSorting(params?.sort);
  }

  private _initPaginator(params?: ConfigTablePagination): void {
    this._loadingForData$.next(true);
    if (params) {
      let parameters;

      params === true
      ? parameters = null
      : parameters = params;

      this._paginator = new Pagination(parameters);
      this._listenPagChanges();
      this._listenFetch();
      this._fetch$.next();
    } else {
      this._sendAllFetchData();
    }
  }

  private _initSorting(params?: IConfigTableSort): void {
    this._loadingForData$.next(true);
    if (params) {
      this._sort.currentColumn = params;
      this._fetch$.next();
    }
    this._listenSortChanges();
  }

  private _listenPagChanges(): void {
    this._paginator.change$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._loadingForData$.next(true);
        this._fetch$.next();
      });
  }

  private _listenSortChanges(): void {
    this._sort.column$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._fetch$.next();
      });
  }

  private _listenFetch(): void {
    this._fetch$
      .pipe(
        debounceTime(100),
        switchMap(
          () => {
            let query = {};

            if (this.paginator) {
              query = { ...query, ...this.paginator.query };
            }

            if (this._sort.enable) {
              query = { ...query, ...this._sort.query }; // 30.02.2020  00:00 isDate && isValid
            }

            return this._config.fetch(query as IQueryParams);
          },
        ),
        takeUntil(this._destroy$),
      )
      .subscribe((response: IResponseFormat) => {
        this._dataOfFetch$.next(response.data);
        if (this.paginator) {
          this.paginator.updatePagInfo(response.paging);
        }
        this._loadingForData$.next(false);
      });
  }

  private _sendAllFetchData(): void {
    this._config.fetch({ page: 1, pageSize: 1 })
      .pipe(
        switchMap(
          (response: IResponseFormat) => {
            const records = response.paging.records;

            return this._config.fetch({
              page: 1,
              pageSize: records,
            });
          },
        ),
        takeUntil(this._destroy$),
      )
      .subscribe(
        (response: IResponseFormat) => {
          this._dataOfFetch$.next(response.data);
        },
      );
  }

}
