import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MTableComponent } from './components/m-table/m-table.component';
import { MTableCellDirective } from './directives/m-table-cell/m-table-cell.directive';
import { MTableColumnDirective } from './directives/m-table-column/m-table-column.directive';


@NgModule({
  declarations: [
    MTableComponent,
    MTableCellDirective,
    MTableColumnDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MTableComponent,
    MTableCellDirective,
    MTableColumnDirective,
  ],
})
export class TableModule {}
