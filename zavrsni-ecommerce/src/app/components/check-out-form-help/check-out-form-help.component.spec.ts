import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutFormHelpComponent } from './check-out-form-help.component';

describe('CheckOutFormHelpComponent', () => {
  let component: CheckOutFormHelpComponent;
  let fixture: ComponentFixture<CheckOutFormHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOutFormHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckOutFormHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
