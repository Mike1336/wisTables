import { Component } from '@angular/core';

import { of } from 'rxjs';

import { IMTableConfig } from './table/interfaces/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public title = 'wis-tables';

  public config: IMTableConfig = {
    fetch: () => {
      return of(['lol', 'kek', 'cheburek']);
    }
  }

}
