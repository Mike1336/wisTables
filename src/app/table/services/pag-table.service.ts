import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { IQueryParams } from './../interfaces/response-format';

@Injectable({
  providedIn: 'root',
})
export class PagTableService {

  private $pagingData = new Subject<IQueryParams>();

  public get $paging(): Observable<IQueryParams> {
    return this.$pagingData.asObservable();
  }

  public setPagData(newData: IQueryParams): void {
    this.$pagingData.next(newData);
  }

}
