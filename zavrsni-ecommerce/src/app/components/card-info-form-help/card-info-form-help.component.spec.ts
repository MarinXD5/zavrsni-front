import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfoFormHelpComponent } from './card-info-form-help.component';

describe('CardInfoFormHelpComponent', () => {
  let component: CardInfoFormHelpComponent;
  let fixture: ComponentFixture<CardInfoFormHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardInfoFormHelpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardInfoFormHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
