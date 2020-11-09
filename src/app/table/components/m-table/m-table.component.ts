import { Component, Input, OnInit, ContentChildren, QueryList, ChangeDetectionStrategy } from '@angular/core';

import { IResponseFormat } from './../../interfaces/response-format';
import { MTableColumnDirective } from './../../directives/m-table-column/m-table-column.directive';

@Component({
  selector: 'm-table',
  templateUrl: './m-table.component.html',
  styleUrls: ['./m-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MTableComponent implements OnInit {

  @Input()
  public config: IResponseFormat;

  @ContentChildren(MTableColumnDirective)
  public columns: QueryList<MTableColumnDirective>;

  constructor() { }

  public ngOnInit(): void {
  }

}
