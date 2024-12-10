import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterListDetailComponent } from './master-list-detail.component';

describe('MasterListDetailComponent', () => {
  let component: MasterListDetailComponent;
  let fixture: ComponentFixture<MasterListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterListDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
