import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MTableComponent } from './components/m-table/m-table.component';
import { MTableCellDirective } from './directives/m-table-cell/m-table-cell.directive';
import { MTableColumnDirective } from './directives/m-table-column/m-table-column.directive';
import { MTableColumnTitleDirective } from './directives/m-table-column-title/m-table-column-title.directive';
import { MTablePaginatorComponent } from './components/m-table-paginator/m-table-paginator.component';

@NgModule({
  declarations: [
    MTableComponent,
    MTableCellDirective,
    MTableColumnDirective,
    MTableColumnTitleDirective,
    MTablePaginatorComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MTableComponent,
    MTableCellDirective,
    MTableColumnDirective,
    MTableColumnTitleDirective,
    MTablePaginatorComponent,
  ],
})
export class TableModule {}
