import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';

import { PagTableService } from './../../services/pag-table.service';
import { IResponsePaging } from './../../interfaces/response-format';

@Component({
  selector: 'm-table-paginator',
  templateUrl: './m-table-paginator.component.html',
  styleUrls: ['./m-table-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MTablePaginatorComponent implements OnInit, OnChanges {

  @Input()
  public config: IResponsePaging;

  public limits = [1, 5, 10];

  public pages: number;
  public currentPage = 1;

  @ViewChild('limitSelector')
  public limitSelector;

  constructor(private pagTableService: PagTableService) {}

  public ngOnInit(): void {
  }

  public ngOnChanges(): void {
    this.pages = Math.ceil(this.config.records / this.config.limit);
  }

  public changeLimit(): void {
    const newLimit = +this.limitSelector.nativeElement.value;

    this.currentPage = 1;

    this.pagTableService.setPagData(
      {
        page: this.currentPage,
        pageSize: newLimit,
      },
      );
  }

  public decreasePageNumber(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pagTableService.setPagData(
        {
          page: this.currentPage,
          pageSize: this.config.limit,
        },
        );
    }
  }

  public increasePageNumber(): void {
    if ((this.currentPage + 1) <= this.pages) {
      this.currentPage++;
      this.pagTableService.setPagData(
        {
          page: this.currentPage,
          pageSize: this.config.limit,
        },
      );
    }
  }

}
