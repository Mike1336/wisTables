import { Subject, Observable, BehaviorSubject } from 'rxjs';

import { IQueryParams, IResponsePaging, IPagConstructor } from './../interfaces/response-format';

export class Pagination {

  private _change$ = new Subject<IQueryParams>();
  private _init$ = new BehaviorSubject<boolean>(false);

  private _currentPage = 1;
  private _limit = 1;
  private _limits = [1, 5, 10];
  private _records = 0;
  private _offset: number;

  constructor(info?: IPagConstructor) {
    this._limits = info?.limits;
    this._limit = info?.pageSize;
    this._records = info.records;
  }

  public get change$(): Observable<IQueryParams> {
    return this._change$.asObservable();
  }

  public get init$(): Observable<boolean> {
    return this._init$.asObservable();
  }

  public get query(): IQueryParams {
    return {
      page: this.currentPage,
      pageSize: this.pageSize,
    };
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
    this._currentPage = 1;
    this.setChange();
  }

  public updatePagInfo(info: IResponsePaging): void {
    this._records = info.records;
    this._limit = info.limit;
    this._offset = info.offset;

    this._init$.next(true);
  }

  public setChange(): void {
    this._change$.next({
      page: this._currentPage,
      pageSize: this._limit,
      pages: this.pages,
    });
  }

  public increase(): void {
    if (this._currentPage < this.pages) {
      this._currentPage ++;
      this.setChange();
    }
  }

  public decrease(): void {
    if (this._currentPage > 1) {
      this._currentPage --;
      this.setChange();
    }
  }

  public reset(): void {
    this.setChange();
  }

  public goToPage(page: number): void {
    this._currentPage = page;
    this.setChange();
  }

  public goToLastPage(): void {
    this._currentPage = this._records / this._limit;
    this.setChange();
  }

}
