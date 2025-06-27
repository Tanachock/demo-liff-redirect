import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccesCloseComponent } from './succes-close.component';

describe('SuccesCloseComponent', () => {
  let component: SuccesCloseComponent;
  let fixture: ComponentFixture<SuccesCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccesCloseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccesCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
