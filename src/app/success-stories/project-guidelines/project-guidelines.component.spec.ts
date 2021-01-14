import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGuidelinesComponent } from './project-guidelines.component';

describe('ProjectGuidelinesComponent', () => {
  let component: ProjectGuidelinesComponent;
  let fixture: ComponentFixture<ProjectGuidelinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectGuidelinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectGuidelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
