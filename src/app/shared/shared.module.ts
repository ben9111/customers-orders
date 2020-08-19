import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterTextboxModule } from './filter-textbox/filter-textbox.module';
import { PaginationModule } from './pagination/pagination.module';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TrimPipe } from './pipes/trim.pipe';
import { SortByDirective } from './directives/sortby.directive';
import { PopupComponent } from './popup/popup.component';
import { NgxBoostrapModule } from './ngx-boostrap/ngx-boostrap.module';


@NgModule({
  declarations: [
    CapitalizePipe,
    TrimPipe,
    SortByDirective,
    PopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FilterTextboxModule,
    PaginationModule,
    NgxBoostrapModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CapitalizePipe,
    TrimPipe,
    SortByDirective,
    FilterTextboxModule,
    PaginationModule,
    NgxBoostrapModule,
  ]
})
export class SharedModule { }
