import { ContentChild, Directive, Input, OnInit } from '@angular/core';

import { MTableCellDirective } from '../m-table-cell/m-table-cell.directive';

@Directive({
  selector: 'm-table-column',
})
export class MTableColumnDirective implements OnInit {

  @Input()
  public title: string;

  @ContentChild(MTableCellDirective, { static: true })
  public tableRow: MTableCellDirective;


  constructor() { }

  public ngOnInit(): void {
    console.log(this.tableRow);
  }

}
