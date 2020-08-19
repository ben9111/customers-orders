import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/services/data.service';
import { ICustomer, IPagedResults } from '../shared/interfaces';
import { TrackByService } from '../core/services/trackby.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PopupComponent } from '../shared/popup/popup.component';

@Component({
    selector: 'cm-customers-orders',
    templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
    modalRef: BsModalRef;
    customers: ICustomer[];
    totalRecords = 0;
    pageSize = 5;

    constructor(
        private dataService: DataService,
        public trackbyService: TrackByService,
        private modalService: BsModalService) { }

    ngOnInit() {
        this.getCustomersPage(1);
    }

    pageChanged(page: number) {
        this.getCustomersPage(page);
    }

    getCustomersPage(page: number) {
        this.dataService.getCustomersPage((page - 1) * this.pageSize, this.pageSize)
            .subscribe((response: IPagedResults<ICustomer[]>) => {
                this.totalRecords = response.totalRecords;
                this.customers = response.results;
            });
    }

    newOrder(cs: ICustomer) {
        this.modalRef = this.modalService.show(PopupComponent, { initialState: { customer: cs } });
        this.modalRef.content
            .IsOrderSuccess
            .subscribe((res: boolean) => res ? this.getCustomersPage(1) : '');
    }

}
