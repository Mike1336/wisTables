import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { IResponseFormat } from '../interfaces/response-format';

import { IQueryParams } from './../interfaces/response-format';

@Injectable({
  providedIn: 'root',
})
export class PhoneStoreService {

  private tableData = [
    {
      id: 1,
      name: 'Xiaomi POCO X3',
      brand: 'Xiaomi',
      price: 19999,
    },
    {
      id: 2,
      name: 'Xiaomi Redmi Note 9',
      brand: 'Xiaomi',
      price: 12999,
    },
    {
      id: 3,
      name: 'Xiaomi Redmi Note 9S',
      brand: 'Xiaomi',
      price: 14999,
    },
    {
      id: 4,
      name: 'Xiaomi Redmi Note 9 Pro',
      brand: 'Xiaomi',
      price: 18999,
    },
    {
      id: 5,
      name: 'Xiaomi Mi Mix Alpha',
      brand: 'Xiaomi',
      price: 199990,
    },
    {
      id: 6,
      name: 'Apple iPhone SE',
      brand: 'Apple',
      price: 19999,
    },
    {
      id: 7,
      name: 'Apple iPhone 6s',
      brand: 'Apple',
      price: 24999,
    },
    {
      id: 8,
      name: 'Apple iPhone X',
      brand: 'Apple',
      price: 39999,
    },
    {
      id: 9,
      name: 'Apple iPhone 11 Pro',
      brand: 'Apple',
      price: 79999,
    },
    {
      id: 10,
      name: 'Apple iPhone 12 Mini',
      brand: 'Apple',
      price: 69999,
    },
    {
      id: 11,
      name: 'Apple iPhone 12 Pro',
      brand: 'Apple',
      price: 79999,
    },
  ];

  constructor() { }

  public getPhones(query?: IQueryParams): Observable<IResponseFormat> {
    const limit = query.pageSize;
    const offset = (limit * query.page) - limit;

    const editedTableData = this.tableData.slice(offset, offset + limit);

    return of({
      data: editedTableData ?? this.tableData,
      paging: {
        records: this.tableData.length,
        limit,
        offset,
      },
    });
  }

}
