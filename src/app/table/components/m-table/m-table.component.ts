import {
  Component,
  Input,
  OnInit,
  ContentChildren,
  QueryList,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import { PagTableService } from './../../services/pag-table.service';
import { IPhoneData } from './../../interfaces/phone-data';
import {
  IConfigFormat,
  IQueryParams,
  IResponseFormat,
  IResponsePaging
} from './../../interfaces/response-format';
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

  public paging: IResponsePaging;

  private $destroy = new ReplaySubject<number>(1);

  constructor(private pagTableService: PagTableService) { }

  public ngOnInit(): void {
    this.getData({ page: 1, pageSize: 5 });
    this.trackPagChanges();
  }

  public ngOnDestroy(): void {
    this.$destroy.next(null);
    this.$destroy.complete();
  }

  public getData(query: IQueryParams): void {
    this.config.fetch(query).pipe(
      takeUntil(this.$destroy),
    )
      .subscribe((response: IResponseFormat) => {
        this.phones = response.data;
        this.paging = response.paging;
      });
  }

  public trackPagChanges(): void {
    this.pagTableService.$paging
      .pipe(
        takeUntil(this.$destroy),
      )
      .subscribe(
          (newPagData: IQueryParams) => {
            this.getData(newPagData);
          },
      );
  }

}
