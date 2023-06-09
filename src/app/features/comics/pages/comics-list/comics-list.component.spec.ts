import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsListComponent } from './comics-list.component';

describe('ComicsListComponent', () => {
  let component: ComicsListComponent;
  let fixture: ComponentFixture<ComicsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComicsListComponent]
    });
    fixture = TestBed.createComponent(ComicsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
