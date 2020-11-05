import {Observable} from 'rxjs';

export interface IMTableConfig {
  fetch: () => Observable<unknown[]>;
}
