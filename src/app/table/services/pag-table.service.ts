import { Injectable, OnDestroy } from '@angular/core';

import { Observable, Subject, ReplaySubject, BehaviorSubject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';

import { Pagination } from '../pagination/pagination';

import { IPhoneData } from './../interfaces/phone-data';
import { ConfigTablePagination, IConfigFormat, IResponseFormat, IQueryParams } from './../interfaces/response-format';

@Injectable()
export class PagTableService implements OnDestroy {

  private _dataOfFetch$ = new BehaviorSubject<IPhoneData[]>(null);

  private _fetch$ = new Subject<void>();

  private destroy$ = new ReplaySubject<number>(1);

  private _config: IConfigFormat;

  private _paginator: Pagination;

  constructor() {
    this._listenFetch();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public get paginator(): Pagination {
    return this._paginator;
  }

  public get dataFromFetch$(): Observable<IPhoneData[]> {
    return this._dataOfFetch$.asObservable();
  }

  public setConfig(value: IConfigFormat): void {
    this._config = value;
    this._initPaginator(this._config.pagination);
    this._fetch$.next();
  }

  private _initPaginator(params?: ConfigTablePagination): void {
    if (params) {
      let parameters;

      params === true
      ? parameters = null
      : parameters = params;

      this._paginator = new Pagination(parameters);
      this._listenPagChanges();
    }
  }

  private _listenPagChanges(): void {
    this._paginator?.change$
      .pipe(
        takeUntil(this.destroy$),
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

            return this._config.fetch(query as IQueryParams);
          },
        ),
        takeUntil(this.destroy$),
      )
      .subscribe((response: IResponseFormat) => {
        this._dataOfFetch$.next(response.data);
        this.paginator.updatePagInfo(response.paging);
      });
  }

}
