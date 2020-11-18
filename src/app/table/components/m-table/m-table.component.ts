import {
  Component,
  Input,
  OnInit,
  ContentChildren,
  QueryList,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { ReplaySubject, Observable } from 'rxjs';

import { SortTableService } from '../../services/sort-table.service';

import { PagTableService } from './../../services/pag-table.service';
import { IPhoneData } from './../../interfaces/phone-data';
import { IConfigFormat } from './../../interfaces/response-format';
import { MTableColumnDirective } from './../../directives/m-table-column/m-table-column.directive';

@Component({
  selector: 'm-table',
  templateUrl: './m-table.component.html',
  styleUrls: ['./m-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MTableComponent implements OnInit, OnDestroy {

  @Input()
  public config: IConfigFormat;

  @ContentChildren(MTableColumnDirective)
  public columns: QueryList<MTableColumnDirective>;

  public data: object[];

  public showOptions: boolean;

  private _destroy$ = new ReplaySubject<number>(1);

  constructor(
    private _pagTableService: PagTableService,
    private _sortTableService: SortTableService,
    private _cdRef: ChangeDetectorRef,
    ) { }

  public get data$(): Observable<IPhoneData[]> {
    return this._pagTableService.dataFromFetch$;
  }

  public ngOnInit(): void {
    this._pagTableService.setConfig(this.config);
    this.initData();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public initData(): void {
    this.data$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(
        (data: object[]) => {
          this.data = data;
          if (this.config.sort && data) {
            this.data = this._sortTableService.getSortedData(
              this.data,
              this.config.sort.column.toLowerCase(),
              this.config.sort.direction,
              );
          }
          this._cdRef.markForCheck();
        },
      );
  }

  public onSortClick(event, columnTitle: string): void {
    const target = event.currentTarget;
    const classList = target.classList;

    if (classList.contains('icon-arrow-up2')) {
      classList.remove('icon-arrow-up2');
      classList.add('icon-arrow-down2');
      this.data = this._sortTableService.getSortedData(
        this.data,
        columnTitle.toLowerCase(),
        'desc',
        );
    } else {
      classList.add('icon-arrow-up2');
      classList.remove('icon-arrow-down2');
      this.data = this._sortTableService.getSortedData(
        this.data,
        columnTitle.toLowerCase(),
        'asc',
        );
    }

  }

}
