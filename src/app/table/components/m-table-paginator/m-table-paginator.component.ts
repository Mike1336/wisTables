import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';

import { Pagination } from './../../pagination/pagination';

@Component({
  selector: 'm-table-paginator-component',
  templateUrl: './m-table-paginator.component.html',
  styleUrls: ['./m-table-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MTablePaginatorComponent implements OnInit {

  @Input()
  public instance: Pagination;

  @ViewChild('limitSelector', { static: true })
  public limitSelector;

  constructor() {}

  public ngOnInit(): void {
  }

  public onSelectorChange(): void {
    const selectedLimit = +this.limitSelector.nativeElement.value;
    this.instance.setLimit(selectedLimit);
  }

}
