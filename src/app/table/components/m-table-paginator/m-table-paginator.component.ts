import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IQueryParams } from './../../interfaces/response-format';
import { PagTableService } from './../../services/pag-table.service';

@Component({
  selector: 'm-table-paginator',
  templateUrl: './m-table-paginator.component.html',
  styleUrls: ['./m-table-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MTablePaginatorComponent implements OnInit, OnDestroy {

  public currentPage = 1;
  public pageSize: number;
  public pages: number;
  public limits: number[];

  @ViewChild('limitSelector')
  public limitSelector;

  private _destroy$ = new ReplaySubject<number>(1);

  constructor(private pagTableService: PagTableService) {}

  public ngOnInit(): void {
    this.getParams();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public getParams(): void {
    this.pagTableService.getPagingData$()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(
        (params: IQueryParams) => {
          this.pages = params.pages;
          this.pageSize = params.pageSize;
          this.limits = params.limits;
        },
      );
  }

  public changeLimit(): void {
    const newLimit = +this.limitSelector.nativeElement.value;

    this.currentPage = 1;

    this.pagTableService.changePagParams(
      {
        page: this.currentPage,
        pageSize: newLimit,
      },
      );
  }

  public decreasePageNumber(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pagTableService.changePagParams(
        {
          page: this.currentPage,
          pageSize: this.pageSize,
        },
        );
    }
  }

  public increasePageNumber(): void {
    if ((this.currentPage + 1) <= this.pages) {
      this.currentPage++;
      this.pagTableService.changePagParams(
        {
          page: this.currentPage,
          pageSize: this.pageSize,
        },
      );
    }
  }

}
