import { Component, Input, OnInit } from '@angular/core';

import { IPhoneData } from './../../interfaces/phone-data';
import { IConfigTableAction } from './../../interfaces/response-format';

@Component({
  selector: 'm-table-row-actions',
  templateUrl: './m-table-row-actions.component.html',
  styleUrls: ['./m-table-row-actions.component.scss'],
})
export class MTableRowActionsComponent implements OnInit {

  @Input()
  public row: IPhoneData;

  @Input()
  public actions: IConfigTableAction;

  public show: boolean;

  constructor() { }

  public ngOnInit(): void {
  }

  public handleClick(action: any): void {
    action.click(this.row);
  }

}
