import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[mTableColumnTitle]',
})
export class MTableColumnTitleDirective {

  @Input()
  public sort: boolean;

  @Input('mTableColumnTitle')
  public value: string;

  constructor(public templateRef: TemplateRef<unknown>) {}

}
