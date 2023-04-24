import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthbuttoncomponentComponent } from './authbuttoncomponent.component';

describe('AuthbuttoncomponentComponent', () => {
  let component: AuthbuttoncomponentComponent;
  let fixture: ComponentFixture<AuthbuttoncomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthbuttoncomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthbuttoncomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
