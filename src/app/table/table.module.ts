import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MTableComponent } from './components/m-table/m-table.component';
import { MTableColumnComponent } from './components/m-table-column/m-table-column.component';
import { MTableCellDirective } from './directives/m-table-cell/m-table-cell.directive';


@NgModule({
  declarations: [
    MTableComponent,
    MTableColumnComponent,
    MTableCellDirective,
  ],
  imports: [
    CommonModule,
  ],
})
export class TableModule { }
