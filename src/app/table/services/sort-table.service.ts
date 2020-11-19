import { Injectable, QueryList } from '@angular/core';

import { Subject, Observable, ReplaySubject } from 'rxjs';

import { MTableColumnDirective } from '../directives/m-table-column/m-table-column.directive';

import { IConfigTableSort, DirectionKinds } from './../interfaces/response-format';

@Injectable()
export class SortTableService {

  public enable: boolean;

  private _currentColumn: IConfigTableSort;
  private _currentColumn$ = new ReplaySubject<IConfigTableSort>(1);
  private _columns: string[] = [];

  constructor() { }

  public get columns(): string[] {
    return this._columns;
  }

  public get column$(): Observable<IConfigTableSort> {
    return this._currentColumn$.asObservable();
  }

  public get query(): IConfigTableSort {
    return this._currentColumn;
  }

  public set currentColumn(value: IConfigTableSort) {
    this.enable = true;
    this._currentColumn = value;
    this._currentColumn$.next(value);
  }

  public setColumn(value: string): void {
    this._currentColumn = {
      column: value,
      direction: this._getColumnDirection(value),
    };

    this.enable = true;
    this._currentColumn$.next(this._currentColumn);
  }

  public chooseColumns(columns: QueryList<MTableColumnDirective>): void {
    let sortableColumns: string[] = columns
    .filter((column) => column.sort)
    .map((column) => column.title);

    if (this._currentColumn) {
      sortableColumns = sortableColumns.filter(
        (column) => {
          return column !== this._currentColumn.column;
        },
      );
      sortableColumns.push(this._currentColumn.column);
    }

    this._columns = sortableColumns;

    if (this._columns.length > 0) {
      this.enable = true;
    }
  }

  private _getColumnDirection(columnTitle: string): DirectionKinds {
    if (this._currentColumn?.column === columnTitle) {
      return this._currentColumn.direction === 'asc' ? 'desc' : 'asc';
    }

    return 'asc';
  }

}
