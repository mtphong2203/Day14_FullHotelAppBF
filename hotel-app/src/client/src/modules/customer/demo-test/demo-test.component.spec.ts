import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoTestComponent } from './demo-test.component';

describe('DemoTestComponent', () => {
  let component: DemoTestComponent;
  let fixture: ComponentFixture<DemoTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
