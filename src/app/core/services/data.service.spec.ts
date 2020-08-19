import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { UtilitiesService } from './utilities.service';
import { ICustomer, } from 'src/app/shared/interfaces';
import { CoreModule } from '../core.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs/internal/observable/of';
import * as customersMock from '../../../../data/customers.json';

let dataService: DataService;
describe('DataService', () => {

    let mockResponseOrder = {
        id: 1,
        firstName: "ted",
        lastName: "james",
        gender: "male",
        address: "1234 Anywhere St.",
        city: " Phoenix ",
        state: {
            "abbreviation": "AZ",
            "name": "Arizona"
        },
        orders: [
            { productName: "Basketball", "itemCost": 7.99 },
            { productName: "Shoes", "itemCost": 199.99 },
            { productName: "cookie", "itemCost": 10.2 }
        ],
        latitude: 33.299,
        longitude: -111.963
    }

    let mockResponseSingleCustomer = {
        id: 1,
        firstName: "ted",
        lastName: "james",
        gender: "male",
        address: "1234 Anywhere St.",
        city: " Phoenix ",
        state: {
            "abbreviation": "AZ",
            "name": "Arizona"
        },
        orders: [
            { productName: "Basketball", "itemCost": 7.99 },
            { productName: "Shoes", "itemCost": 199.99 },
        ],
        latitude: 33.299,
        longitude: -111.963
    }
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                CoreModule,
            ],
            providers: [
                UtilitiesService,
                DataService,
            ]
        });
        dataService = TestBed.inject(DataService);

        spyOn(dataService, 'newOrder').and.returnValue(of(mockResponseOrder));
        spyOn(dataService, 'getCustomers').and.returnValue(of(customersMock));
        spyOn(dataService, "getCustomer").and.returnValue(of(customersMock[0]))
    });

    it("@GET ALL Customers", () => {
        dataService.getCustomers()
            .subscribe(custs => {
                expect(custs).toEqual(customersMock)
            })
    })

    it("@GET ONE Customer", () => {
        dataService.getCustomer(1)
            .subscribe(customer => {
                expect(customer).toEqual(mockResponseSingleCustomer)
            })
    })

    it('@UPDATE NEW ORDER and return the customer object with the new orders list', () => {
        let orderToAddCustomer =
            { productName: "cookie", "itemCost": 10.2 };
        let newOrderCustomer =
        {
            newOrder: { productName: "cookie", "itemCost": 10.2 },
            customer: {
                id: 1,
                firstName: "ted",
                lastName: "james",
                gender: "male",
                address: "1234 Anywhere St.",
                city: " Phoenix ",
                state: {
                    "abbreviation": "AZ",
                    "name": "Arizona"
                },
                orders: [
                    { productName: "Basketball", "itemCost": 7.99 },
                    { productName: "Shoes", "itemCost": 199.99 }
                ],
                latitude: 33.299,
                longitude: -111.963

            },
        }
        dataService.newOrder(newOrderCustomer)
            .subscribe((res: ICustomer) =>
                expect(res.orders[2]).toEqual(orderToAddCustomer)
            )
    })

    it('@INITAL DataService', () => {
        expect(dataService).toBeTruthy();
    });
});
