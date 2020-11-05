import { Component, Input, OnInit, ContentChildren, AfterViewInit } from '@angular/core';

import { IMTableConfig } from '../../interfaces/config';

import { MTableColumnDirective } from './../../directives/m-table-column/m-table-column.directive';

@Component({
  selector: 'm-table',
  templateUrl: './m-table.component.html',
  styleUrls: ['./m-table.component.scss'],
})
export class MTableComponent implements OnInit, AfterViewInit {

  @Input()
  public config: IMTableConfig;

  @ContentChildren(MTableColumnDirective)
  public columns: MTableColumnDirective;

  constructor() { }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    console.log(this.columns);
  }

  public fetchDataCheck(): void {
    const data = this.config.fetch();
    data.subscribe(console.log)
  }

}
