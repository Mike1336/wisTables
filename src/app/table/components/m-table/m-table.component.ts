import {
  Component,
  Input,
  OnInit,
  ContentChildren,
  QueryList,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
  AfterContentInit,
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Observable } from 'rxjs';

import { SortTableService } from '../../services/sort-table.service';
import { TableService } from '../../services/table.service';

import { IPhoneData } from './../../interfaces/phone-data';
import { IConfigFormat, IConfigTableSort } from './../../interfaces/response-format';
import { MTableColumnDirective } from './../../directives/m-table-column/m-table-column.directive';

@Component({
  selector: 'm-table',
  templateUrl: './m-table.component.html',
  styleUrls: ['./m-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MTableComponent implements OnInit, AfterContentInit, OnDestroy {

  @Input()
  public config: IConfigFormat;

  @ContentChildren(MTableColumnDirective)
  public columns: QueryList<MTableColumnDirective>;

  public data: object[];

  public selectedColumn: IConfigTableSort;

  public sortableColumns: string[];

  public showOptions: boolean;

  public loading: boolean;

  private _destroy$ = new ReplaySubject<number>(1);

  constructor(
    private _tableService: TableService,
    private _sortTableService: SortTableService,
    private _cdRef: ChangeDetectorRef,
    ) { }

  public get data$(): Observable<IPhoneData[]> {
    return this._tableService.dataFromFetch$;
  }

  public get loading$(): Observable<boolean> {
    return this._tableService.loading$;
  }

  public get selectedColumn$(): Observable<IConfigTableSort> {
    return this._tableService.selectedSortColumn$;
  }

  public ngOnInit(): void {
    this._tableService.setConfig(this.config);
    this._initData();
    this._initSorting();
  }

  public ngAfterContentInit(): void {
    this.sortableColumns = this._tableService.getSortableColumns(this.columns);
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }


  public setSortColumn(name: string): void {
    this._sortTableService.setColumn(name);
  }

  public isSortableColumn(name: string): boolean {
    const index = this.sortableColumns.findIndex((column) => column === name);

    return index > -1 ? true : false;
  }

  private _initData(): void {
    this.data$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(
        (data: object[]) => {
          this.data = data;
          this._cdRef.markForCheck();
        },
      );
  }

  private _initSorting(): void {
    this.selectedColumn$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(
        (data: IConfigTableSort) => {
          this.selectedColumn = data;
          this._cdRef.markForCheck();
        },
      );
  }


}
