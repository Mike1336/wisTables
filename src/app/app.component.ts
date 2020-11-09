import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IQuery } from './table/interfaces/query';
import { IResponseFormat, IResponsePaging } from './table/interfaces/response-format';
import { TableService } from './table/services/table.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {

  public title = 'wis-tables';

  public config: IResponseFormat;
  public paging: IResponsePaging;

  private $destroy = new ReplaySubject<number>(1);

  constructor(private tableService: TableService) {
  }

  public ngOnInit(): void {
    this.subscribeToPhones();
    this.getPhones();
  }

  public ngOnDestroy(): void {
    this.$destroy.next(null);
    this.$destroy.complete();
  }

  public subscribeToPhones(): void {
    this.tableService.$phones
      .pipe(
        takeUntil(this.$destroy),
      )
      .subscribe((response: IResponseFormat) => {
        this.config = response;
        this.paging = response.paging;
      });
  }

  public getPhones(query?: IQuery): void {
    this.tableService.getPhones(query);
  }

  public changeLimit(newLimit: string): void {
    this.getPhones({ limit: +newLimit });
  }

  public changePage(newPagConfig: IResponsePaging): void {
    this.getPhones(
      {
        limit: newPagConfig.limit,
        offset: newPagConfig.offset,
      },
    );
  }

}
