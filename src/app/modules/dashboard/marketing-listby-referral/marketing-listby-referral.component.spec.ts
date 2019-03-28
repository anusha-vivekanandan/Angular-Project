import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingListbyReferralComponent } from './marketing-listby-referral.component';

describe('MarketingListbyReferralComponent', () => {
  let component: MarketingListbyReferralComponent;
  let fixture: ComponentFixture<MarketingListbyReferralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketingListbyReferralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingListbyReferralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
