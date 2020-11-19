import { Observable } from 'rxjs';

import { IPhoneData } from './phone-data';

export interface IResponseFormat {
  data: IPhoneData[];
  paging: {
    records: number;
    limit: number;
    offset: number;
  };
}

export interface IResponsePaging {
  records: number;
  limit: number;
  offset: number;
}

export interface IQueryParams {
  page: number;
  pageSize: number;
  column?: string;
  direction?: DirectionKinds;
  pages?: number;
  limits?: number[];
}

export interface IConfigFormat {
  fetch: (parameters: IQueryParams) => Observable<IResponseFormat>;
  sort?: IConfigTableSort;
  pagination?: ConfigTablePagination;
  actions?: IConfigTableAction[];
}

export interface IConfigTablePagination {
  limits?: number[];
  pageSize?: number;
}

export interface IPagConstructor {
  limits?: number[];
  pageSize?: number;
  records?: number;
}

export type ConfigTablePagination = boolean | IConfigTablePagination;

export interface IConfigTableAction {
  label: string;
  click: (row: IPhoneData) => void;
}

export type DirectionKinds = 'asc' | 'desc';

export interface IConfigTableSort {
  column: string;
  direction: DirectionKinds;
}
