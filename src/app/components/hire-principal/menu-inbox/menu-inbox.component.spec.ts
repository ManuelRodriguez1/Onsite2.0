import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuInboxComponent } from './menu-inbox.component';

describe('MenuInboxComponent', () => {
  let component: MenuInboxComponent;
  let fixture: ComponentFixture<MenuInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuInboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
