import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentAndStudentsComponentComponent } from './department-and-students-component.component';

describe('DepartmentAndStudentsComponentComponent', () => {
  let component: DepartmentAndStudentsComponentComponent;
  let fixture: ComponentFixture<DepartmentAndStudentsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentAndStudentsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentAndStudentsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
