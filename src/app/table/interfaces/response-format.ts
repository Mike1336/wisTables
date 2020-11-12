import { Observable } from 'rxjs';

import { Pagination } from './../pagination/pagination';
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
  pagination?: Pagination;
}

export interface IConfigTablePagination {
  limits?: number[];
  pageSize?: number;
}
