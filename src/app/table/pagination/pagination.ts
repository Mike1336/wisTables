import { Subject, Observable } from 'rxjs';

import { IConfigTablePagination, IQueryParams, IResponsePaging } from './../interfaces/response-format';

export class Pagination {

  private _changes$ = new Subject<IQueryParams>();

  private _records: number;
  private _limit: number;
  private _offset: number;
  private _currentPage = 1;
  private _limits: number[];

  constructor(info?: any) {
    this._limits = info?.limits ?? [1, 5, 10];
    this._limit = info?.pageSize ?? 1;
  }

  public get changes$(): Observable<IQueryParams> {
    return this._changes$.asObservable();
  }

  public get query(): any {
    return {
      page: this.currentPage,
      pageSize: this.pageSize,
    }
  }

  public get pageSize(): number {
    return this._limit;
  }

  public get limits(): number[] {
    return this._limits;
  }

  public get pages(): number {
    return Math.ceil(this._records / this._limit);
  }

  public get currentPage(): number {
    return this._currentPage;
  }

  public setLimit(value: number): void {
    this._limit = value;
    this.changeCurrentPage(1);
  }

  public updatePagInfo(info: IResponsePaging): void {
    this._records = info.records;
    this._limit = info.limit;
    this._offset = info.offset;
  }

  public changeCurrentPage(value: number): void {
    this._currentPage = value;

    this._changes$.next({
      page: this._currentPage,
      pageSize: this._limit,
      pages: this.pages,
    });
  }

  public increase(): void {
    if (this._currentPage < this.pages) {
      this._currentPage ++;
      this.changeCurrentPage(this._currentPage);
    }
  }

  public decrease(): void {
    if (this._currentPage > 1) {
      this._currentPage --;
      this.changeCurrentPage(this._currentPage);
    }
  }

  public reset(): void {
    this.changeCurrentPage(1);
  }

  public goToPage(page: number): void {
    this.changeCurrentPage(page);
  }

  public goToLastPage(): void {
    const lastPageNumber = this._records / this._limit;
    this.changeCurrentPage(lastPageNumber);
  }

}
