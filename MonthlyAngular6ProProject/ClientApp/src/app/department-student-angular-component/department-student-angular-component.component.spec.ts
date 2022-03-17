import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentStudentAngularComponentComponent } from './department-student-angular-component.component';

describe('DepartmentStudentAngularComponentComponent', () => {
  let component: DepartmentStudentAngularComponentComponent;
  let fixture: ComponentFixture<DepartmentStudentAngularComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentStudentAngularComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentStudentAngularComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
