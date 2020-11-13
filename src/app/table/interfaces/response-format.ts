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
  pages?: number;
  limits?: number[];
}

export interface IConfigFormat {
  fetch: (parameters: IQueryParams) => Observable<IResponseFormat>;
  pagination?: ConfigTablePagination;
}

export interface IConfigTablePagination {
  limits?: number[];
  pageSize?: number;
}

export type ConfigTablePagination = boolean | IConfigTablePagination;
