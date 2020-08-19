import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/core/services/data.service';
import { ICustomer, INewOrder } from '../interfaces';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'cm-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  @Input() customer?: ICustomer;
  order: FormGroup;
  @Output() IsOrderSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private fb: FormBuilder,
    private data: DataService,
    private modalRef: BsModalRef) { }

  ngOnInit(): void {
    this.order = this.fb.group({
      productName: ["", Validators.required],
      itemCost: ["", Validators.required]
    })
  }

  submitOrder(): void {
    if (this.order.valid) {
      let cust: INewOrder = {
        customer: this.customer,
        newOrder: this.order.value
      }
      this.data.newOrder(cust).subscribe((res: ICustomer) => {
        if (res) {
          this.modalRef.hide();
          this.IsOrderSuccess.emit(true)
        } else {
          this.IsOrderSuccess.emit(false);
        }
      })
    }
  }
}
