import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenLayoutComponent } from './authen-layout.component';

describe('AuthenLayoutComponent', () => {
  let component: AuthenLayoutComponent;
  let fixture: ComponentFixture<AuthenLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
