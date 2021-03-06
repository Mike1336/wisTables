import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SortTableService } from './services/sort-table.service';
import { PhoneStoreService } from './services/phone-store.service';
import { TableService } from './services/table.service';
import { MTableComponent } from './components/m-table/m-table.component';
import { MTableCellDirective } from './directives/m-table-cell/m-table-cell.directive';
import { MTableColumnDirective } from './directives/m-table-column/m-table-column.directive';
import { MTableColumnTitleDirective } from './directives/m-table-column-title/m-table-column-title.directive';
import { MTablePaginatorComponent } from './components/m-table-paginator/m-table-paginator.component';
import { MTableRowActionsComponent } from './components/m-table-row-actions/m-table-row-actions.component';
import { MTablePaginatorContainer } from './containers/m-table-paginator/m-table-paginator.container';

@NgModule({
  declarations: [
    MTableComponent,
    MTableCellDirective,
    MTableColumnDirective,
    MTableColumnTitleDirective,
    MTablePaginatorComponent,
    MTableRowActionsComponent,
    MTablePaginatorContainer,
  ],
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [
    MTableComponent,
    MTableCellDirective,
    MTableColumnDirective,
    MTableColumnTitleDirective,
    MTablePaginatorComponent,
  ],
  providers: [
    TableService,
    PhoneStoreService,
    SortTableService,
  ],
})
export class TableModule {}
