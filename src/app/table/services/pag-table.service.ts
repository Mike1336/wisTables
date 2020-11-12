import { Injectable, OnDestroy } from '@angular/core';

import { Observable, Subject, ReplaySubject, of } from 'rxjs';
import { debounceTime, share, switchMap, takeUntil } from 'rxjs/operators';

import { IPhoneData } from './../interfaces/phone-data';
import { IConfigFormat, IQueryParams, IResponseFormat } from './../interfaces/response-format';

@Injectable()

export class PagTableService implements OnDestroy {

  private pagingData$ = new ReplaySubject<IQueryParams>();

  private dataFromFetch$ = new Subject<IPhoneData[]>();

  private destroy$ = new ReplaySubject<number>(1);

  private config: IConfigFormat;

  public ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  public getPagingData$(): Observable<IQueryParams> {
    return this.pagingData$.asObservable();
  }

  public getDataFromFetch$(): Observable<IPhoneData[]> {
    return this.dataFromFetch$.asObservable();
  }

  public changePagParams(params: IQueryParams): void {
    this.config.pagination.changePagParams(params);
  }

  public setConfig(value: IConfigFormat): void {
    this.config = value;
  }

  public setPagData(data: IQueryParams): void {
    this.pagingData$.next(data);
  }

  public setData(data: IPhoneData[]): void {
    this.dataFromFetch$.next(data);
  }

  public initData(): void {
    if (this.config.pagination) {
      const pagingParams = {
        page: 1,
        pageSize: this.config.pagination.pageSize,
      };

      this.config.fetch(pagingParams)
        .pipe(
          takeUntil(this.destroy$),
        )
        .subscribe(
          (data: IResponseFormat) => {
            this.updateData(data);
          },
      );
      this.listenPagChanges();
    } else {
      this.getPaging()
        .pipe(
        switchMap(
          (paging: IQueryParams) => {
            const paramsForAllPages: IQueryParams = {
              page: 1,
              pageSize: paging.pages * paging.pageSize,
            };

            return this.config.fetch(paramsForAllPages);
          },
        ),
        takeUntil(this.destroy$),
      )
        .subscribe(
        (data: IResponseFormat) => {
          this.setData(data.data);
        },
      );
    }
  }

  public listenPagChanges(): void {
    this.config.pagination.changes$
      .pipe(
        // debounceTime(500),
        switchMap(
          (pagingParams) => {
            return this.config.fetch(pagingParams);
          },
        ),
        takeUntil(this.destroy$),
      )
      .subscribe(
        (data) => {
          this.updateData(data);
        },
      );
  }

  public updateData(data: IResponseFormat): void {
    this.setData(data.data);
    this.config.pagination.updatePagInfo(data.paging);
    this.pagingData$.next(
      {
        page: 1,
        pageSize: data.paging.limit,
        pages: Math.ceil(data.paging.records / data.paging.limit),
        limits: this.config.pagination.limits,
      },
    );
  }

  public getPaging(): Observable<IQueryParams> {
    let pageConfig: IQueryParams;

    this.config.fetch({ page: 1, pageSize: 5 })
      .pipe(
        share(),
        takeUntil(this.destroy$),
      )
      .subscribe(
        (response: IResponseFormat) => {
          pageConfig = {
            page: 1,
            pageSize: response.paging.limit,
            pages: Math.ceil(response.paging.records / response.paging.limit),
          };
        },
      );

    return of(pageConfig);
  }

}
