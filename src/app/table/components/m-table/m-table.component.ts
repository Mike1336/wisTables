import {
  Component,
  Input,
  OnInit,
  ContentChildren,
  QueryList,
  ChangeDetectionStrategy,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

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

  public phones: IPhoneData[];

  private _destroy$ = new ReplaySubject<number>(1);

  constructor(
    private _pagTableService: PagTableService,
    private _cdRef: ChangeDetectorRef,
    ) { }

  public get data$(): any {
    return this._pagTableService.dataFromFetch$;
  }

  public ngOnInit(): void {
    // this.listenData();
    this._pagTableService.setConfig(this.config);
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  // public listenData(): void {
  //   this._pagTableService.dataFromFetch$
  //     .pipe(
  //       takeUntil(this._destroy$),
  //     )
  //     .subscribe(
  //       (data: IPhoneData[]) => {
  //         debugger;
  //         // this.phones = data;
  //         // this._cdRef.markForCheck();
  //       },
  //     );
  // }

}
