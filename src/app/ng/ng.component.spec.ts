import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgComponent } from './ng.component';

describe('NgComponent', () => {
  let component: NgComponent;
  let fixture: ComponentFixture<NgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgComponent]
    });
    fixture = TestBed.createComponent(NgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
