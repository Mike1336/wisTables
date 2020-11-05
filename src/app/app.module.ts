import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TableModule } from './table/table.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    TableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
