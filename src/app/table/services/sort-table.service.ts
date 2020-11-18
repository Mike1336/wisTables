import { Injectable } from '@angular/core';

import { DirectionKinds } from '../interfaces/response-format';

@Injectable()
export class SortTableService {

  constructor() { }

  public getSortedData(data: object[], column: string, mode: DirectionKinds): object[] {
    if (mode === 'asc') {
      return data.sort(
        (currentEl, nextEl) => {
          if (column in currentEl && column in nextEl) {
            if (typeof currentEl[`${column}`] === 'number') {
              return currentEl[`${column}`] - nextEl[`${column}`];
            } else if (typeof currentEl[`${column}`] === 'string') {
              if (currentEl[`${column}`] > nextEl[`${column}`]) {
                return 1;
              }
              if (currentEl[`${column}`] < nextEl[`${column}`]) {
                return -1;
              }

              return 0;
            }
          }
        },
      );
    } else {
      return data.sort(
        (currentEl, nextEl) => {
          if (column in currentEl && column in nextEl) {
            if (typeof currentEl[`${column}`] === 'number') {
              if (currentEl[`${column}`] > nextEl[`${column}`]) {
                return -1;
              }
            } else if (typeof currentEl[`${column}`] === 'string') {
              if (currentEl[`${column}`] > nextEl[`${column}`]) {
                return -1;
              }
              if (currentEl[`${column}`] < nextEl[`${column}`]) {
                return 1;
              }

              return 0;
            }
          }
        },
      );
    }
  }

}
