import { Injectable } from '@angular/core';

import { Observable, ReplaySubject } from 'rxjs';

import { IQuery } from '../interfaces/query';
import { IResponseFormat } from '../interfaces/response-format';

import { IPhoneData } from './../interfaces/phone-data';

@Injectable({
  providedIn: 'root',
})
export class TableService {

  public get $phones(): Observable<IResponseFormat> {
    return this.$phonesData.asObservable();
  }

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
  ];

  private $phonesData = new ReplaySubject<IResponseFormat>(1);

  public getPhones(query?: IQuery): void {
    let editedTableData: IPhoneData[];
    if (query && query.limit && query.offset) {
      editedTableData = this.tableData.slice(query.offset, query.offset + query.limit);
    } else if (query && query.limit) {
      editedTableData = this.tableData.slice(0, query.limit);
    } else if (query && query.offset) {
      editedTableData = this.tableData.slice(query.offset, query.offset + 5);
    } else {
      editedTableData = this.tableData.slice(0, 5);
    }

    this.$phonesData.next({
      data: editedTableData ?? this.tableData,
      paging: {
        records: this.tableData.length,
        limit: (query && query.limit) ?? 5,
        offset: (query && query.offset) ?? 0,
      },
    });
  }

}
