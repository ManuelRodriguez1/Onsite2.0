import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsHireComponent } from './projects-hire.component';

describe('ProjectsHireComponent', () => {
  let component: ProjectsHireComponent;
  let fixture: ComponentFixture<ProjectsHireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsHireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsHireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
