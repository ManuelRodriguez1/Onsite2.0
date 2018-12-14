import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordarPassComponent } from './recordar-pass.component';

describe('RecordarPassComponent', () => {
  let component: RecordarPassComponent;
  let fixture: ComponentFixture<RecordarPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordarPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordarPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
