import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPopupComponent } from './confirm-popup.component';

describe('ConfirmPopupComponent', () => {
  let component: ConfirmPopupComponent;
  let fixture: ComponentFixture<ConfirmPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfirmPopupComponent],
    });
    fixture = TestBed.createComponent(ConfirmPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const data = [
      {
        item: 'lap',
        quantity: 1,
        estimatedPrice: 100000,
      },
      {
        item: 'bag',
        quantity: 1,
        estimatedPrice: 2555,
      }
    ];

    component.missingItem = data;

    expect(component.missingItem).toEqual(data);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
