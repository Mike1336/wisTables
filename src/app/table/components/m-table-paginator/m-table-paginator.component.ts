import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';
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

  @ViewChild('limitSelector', { static: true })
  public limitSelector;

  private _destroy$ = new ReplaySubject<number>(1);

  constructor(
    private _pagTableService: PagTableService,
    private _cdRef: ChangeDetectorRef,
    ) {}

  public ngOnInit(): void {
    this.paginator = this._pagTableService.paginator;
    this.paginator.change$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(
        () => {
          this._cdRef.markForCheck();
        },
      );
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public onSelectorChange(): void {
    const selectedLimit = +this.limitSelector.nativeElement.value;
    this.paginator.setLimit(selectedLimit);
  }

}
