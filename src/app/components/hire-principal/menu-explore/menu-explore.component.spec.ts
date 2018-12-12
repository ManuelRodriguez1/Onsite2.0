import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuExploreComponent } from './menu-explore.component';

describe('MenuExploreComponent', () => {
  let component: MenuExploreComponent;
  let fixture: ComponentFixture<MenuExploreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuExploreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuExploreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
