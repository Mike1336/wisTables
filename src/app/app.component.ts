import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { IConfigFormat, IQueryParams } from './table/interfaces/response-format';
import { Pagination } from './table/pagination/pagination';
import { PhoneStoreService } from './table/services/phone-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  public title = 'wis-tables';

  public config: IConfigFormat;

  constructor(private phoneStoreService: PhoneStoreService) {
  }

  public ngOnInit(): void {
    this.config = {
      fetch: (query: IQueryParams) => {
        return this.phoneStoreService.getPhones(query);
      },
      pagination: new Pagination(
        {
          limits: [1, 2, 5, 10, 12],
          pageSize: 10,
        },
      ),
    };
  }

}
