import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpenerimapageComponent } from './listpenerimapage.component';

describe('ListpenerimapageComponent', () => {
  let component: ListpenerimapageComponent;
  let fixture: ComponentFixture<ListpenerimapageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpenerimapageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpenerimapageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
