import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedRestaurantListComponent } from './shared-restaurant-list.component';

describe('SharedRestaurantListComponent', () => {
  let component: SharedRestaurantListComponent;
  let fixture: ComponentFixture<SharedRestaurantListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedRestaurantListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedRestaurantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
