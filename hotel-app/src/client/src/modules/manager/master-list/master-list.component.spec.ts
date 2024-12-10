import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterListComponent } from './master-list.component';

describe('MasterListComponent', () => {
  let component: MasterListComponent;
  let fixture: ComponentFixture<MasterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
