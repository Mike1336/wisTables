import { Subject, Observable } from 'rxjs';

import { IConfigTablePagination, IQueryParams, IResponsePaging } from './../interfaces/response-format';

export class Pagination {

  private _changes$ = new Subject<IQueryParams>();

  private _records: number;
  private _limit: number;
  private _offset: number;
  private _limits: number[];

  constructor(info?: IConfigTablePagination) {
    this._limits = info?.limits ?? [1, 5, 10];
    this._limit = info?.pageSize ?? 5;
  }

  public get changes$(): Observable<IQueryParams> {
    return this._changes$.asObservable();
  }

  public changePagParams(params: IQueryParams): void {
    this._changes$.next(params);
  }

  public get pageSize(): number {
    return this._limit;
  }

  public get limits(): number[] {
    return this._limits;
  }

  public updatePagInfo(info: IResponsePaging): void {
    this._records = info.records;
    this._limit = info.limit;
    this._offset = info.offset;
  }

  public increase(paging: IQueryParams): void {
    if (paging.page < paging.pages) {
      paging.page ++;
    }
    this._changes$.next({
      page: paging.page,
      pageSize: paging.pageSize,
      pages: this._records / paging.pageSize,
    });
  }

  public decrease(paging: IQueryParams): void {
    if (paging.page > 1) {
      paging.page --;
    }
    this._changes$.next(
      {
        page: paging.page,
        pageSize: paging.pageSize,
        pages: this._records / paging.pageSize,
      });
  }

  public reset(): void {
    this._changes$.next(
      {
        page: 1,
        pageSize: this._limit,
        pages: this._records / this._limit,
      },
    );
  }

  public goToPage(page: number): void {
    this._changes$.next(
      {
        page,
        pageSize: this._limit,
        pages: this._records / this._limit,
      },
    );
  }

  public goToLastPage(): void {
    this._changes$.next(
      {
        page: this._records / this._limit,
        pageSize: this._limit,
        pages: this._records / this._limit,
      },
    );
  }

}
