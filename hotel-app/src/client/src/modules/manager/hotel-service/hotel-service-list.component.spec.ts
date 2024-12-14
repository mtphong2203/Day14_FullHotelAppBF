import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelServiceListComponent } from './hotel-service-list.component';

describe('HotelServiceListComponent', () => {
  let component: HotelServiceListComponent;
  let fixture: ComponentFixture<HotelServiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelServiceListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
