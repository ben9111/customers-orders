import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupComponent } from './popup.component';
import { DataService } from 'src/app/core/services/data.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../shared.module';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PopupComponent,
      ],
      imports: [
        CoreModule,
        SharedModule
      ],
      providers: [
        DataService,
        BsModalRef
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    component.customer = {
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
    fixture.detectChanges();
  });

  it('@INITAL PopupComponent ORDER', () => {
    expect(component).toBeTruthy();
  });
});
