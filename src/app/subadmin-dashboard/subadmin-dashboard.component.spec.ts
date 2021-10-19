import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminDashboardComponent } from './subadmin-dashboard.component';

describe('SubadminDashboardComponent', () => {
  let component: SubadminDashboardComponent;
  let fixture: ComponentFixture<SubadminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubadminDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubadminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
