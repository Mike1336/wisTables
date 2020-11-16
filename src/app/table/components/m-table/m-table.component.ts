import {
  Component,
  Input,
  OnInit,
  ContentChildren,
  QueryList,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';

import { ReplaySubject, Observable } from 'rxjs';

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

  public showOptions: boolean;

  private _destroy$ = new ReplaySubject<number>(1);

  constructor(private _pagTableService: PagTableService) { }

  public get data$(): Observable<IPhoneData[]> {
    return this._pagTableService.dataFromFetch$;
  }

  public ngOnInit(): void {
    this._pagTableService.setConfig(this.config);
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

}
