import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

import { Pagination } from '../../pagination/pagination';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'm-table-paginator',
  templateUrl: './m-table-paginator.container.html',
  styleUrls: ['./m-table-paginator.container.scss'],
})
export class MTablePaginatorContainer implements OnInit, OnDestroy {

  public paginator: Pagination;

  private _destroy$ = new ReplaySubject<number>(1);

  constructor(
    private _pagTableService: TableService,
    private _cdRef: ChangeDetectorRef,
    ) { }

  public ngOnInit(): void {
    this._pagTableService.paginator.init$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((isInit: boolean) => {
        if (isInit) {
          this.paginator = this._pagTableService.paginator;
          this._cdRef.markForCheck();
        }
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }


}
