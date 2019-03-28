import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListbyReferralComponent } from './admin-listby-referral.component';

describe('AdminListbyReferralComponent', () => {
  let component: AdminListbyReferralComponent;
  let fixture: ComponentFixture<AdminListbyReferralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListbyReferralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListbyReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
