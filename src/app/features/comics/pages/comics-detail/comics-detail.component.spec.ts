import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsDetailComponent } from './comics-detail.component';

describe('ComicsDetailComponent', () => {
  let component: ComicsDetailComponent;
  let fixture: ComponentFixture<ComicsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComicsDetailComponent]
    });
    fixture = TestBed.createComponent(ComicsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
