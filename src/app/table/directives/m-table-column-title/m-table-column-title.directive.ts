import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[mTableColumnTitle]',
})
export class MTableColumnTitleDirective {

  constructor(public templateRef: TemplateRef<unknown>) {}

}
