import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { IResponsePaging } from './../../interfaces/response-format';

@Component({
  selector: 'm-table-paginator',
  templateUrl: './m-table-paginator.component.html',
  styleUrls: ['./m-table-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MTablePaginatorComponent implements OnInit {

  @Input()
  public config: IResponsePaging;

  @Output()
  public limitChanged = new EventEmitter<string>();

  @Output()
  public pageSwitched = new EventEmitter<any>();

  public limits = [1, 5, 10];

  @ViewChild('limitSelector')
  public limitSelector;

  constructor() {}

  public ngOnInit(): void {
  }

  public changeLimit(): void {
    this.limitChanged.emit(this.limitSelector.nativeElement.value);
  }

  public decreasePageNumber(): void {
    if (!(this.config.offset - this.config.limit < 0)) {
      this.pageSwitched.emit(
        {
          offset: this.config.offset - this.config.limit,
          limit: this.config.limit,
        },
        );
    }
  }

  public increasePageNumber(): void {
    if (!(this.config.offset + this.config.limit >= this.config.records)) {
      this.pageSwitched.emit(
        {
          offset: this.config.offset + this.config.limit,
          limit: this.config.limit,
        },
        );
    }
  }

}
