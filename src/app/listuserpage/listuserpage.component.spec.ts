import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListuserpageComponent } from './listuserpage.component';

describe('ListuserpageComponent', () => {
  let component: ListuserpageComponent;
  let fixture: ComponentFixture<ListuserpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListuserpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListuserpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
