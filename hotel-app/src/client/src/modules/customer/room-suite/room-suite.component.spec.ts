import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSuiteComponent } from './room-suite.component';

describe('RoomSuiteComponent', () => {
  let component: RoomSuiteComponent;
  let fixture: ComponentFixture<RoomSuiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomSuiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomSuiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
