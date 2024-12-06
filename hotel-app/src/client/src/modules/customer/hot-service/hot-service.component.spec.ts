import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotServiceComponent } from './hot-service.component';

describe('HotServiceComponent', () => {
  let component: HotServiceComponent;
  let fixture: ComponentFixture<HotServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
