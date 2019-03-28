import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgbModule, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { IntakeFormComponent } from './intake-form/intake-form.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarketingComponent } from './marketing/marketing.component';
import { BrowserModule } from '@angular/platform-browser';
import { CallPatientsComponent } from './call-patients/call-patients.component';
import { FrontOfficeComponent } from './front-office/front-office.component';
import { MarketingListbyReferralComponent } from './marketing-listby-referral/marketing-listby-referral.component';
import { AdminListbyReferralComponent } from './admin-listby-referral/admin-listby-referral.component';


@NgModule({
  declarations: [
    IndexComponent,
    PatientListComponent,
    PatientDetailComponent,
    IntakeFormComponent,
    AdminComponent,
    MarketingComponent,
    CallPatientsComponent,
    FrontOfficeComponent,
    MarketingListbyReferralComponent,
    AdminListbyReferralComponent
  ],
  imports: [
   
    CommonModule,
    DashboardRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [IndexComponent],
  providers: []
})
export class DashboardModule { }
