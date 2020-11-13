import { ChangeDetectionStrategy, Component, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { ReplaySubject } from 'rxjs';

import { Pagination } from './../../pagination/pagination';
import { PagTableService } from './../../services/pag-table.service';

@Component({
  selector: 'm-table-paginator',
  templateUrl: './m-table-paginator.component.html',
  styleUrls: ['./m-table-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MTablePaginatorComponent implements OnInit, OnDestroy {

  public paginator: Pagination;

  @ViewChild('limitSelector')
  public limitSelector;

  private _destroy$ = new ReplaySubject<number>(1);

  constructor(private pagTableService: PagTableService) {}

  public ngOnInit(): void {
    this.paginator = this.pagTableService.paginator;
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

}
