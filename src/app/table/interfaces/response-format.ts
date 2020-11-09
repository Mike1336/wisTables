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
