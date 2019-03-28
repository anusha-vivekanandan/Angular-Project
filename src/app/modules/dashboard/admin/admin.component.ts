import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/services/patients.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  closeDetail: boolean = false;

  /** Referral Status **/
  public referralstatus: any = [];

  /** Patient list Referral Status **/
  public list: any;
  public patientList: any;

  /** Reason dropdown list and show referral status and reason list after match **/
  public reasonOption: any;
  public reasonArray = [];
  public reason: any;
  public selectedReferralItem: any;
  public selectedReferralStatus: any;
  public selectedReasonItem: any;
  public referral_Status: any;
  public searchparam: any;

  public weeklyCount:any;


  constructor(
    public patientsService: PatientsService,
    private spinner: NgxSpinnerService
    ) { }

  async ngOnInit() {
  

    /**  call to Referral status service  **/
    const status: any = await this.patientsService.referralStatusService();
    //const wcount: any = await this.patientsService.getWeeklyReffaralsCount();
    //this.weeklyCount=wcount.count;
    this.referralstatus = status.Statuses;
    /** Get the patient referral status list **/
    // const patListData: any = await this.patientsService.getPatientListByReferralStatus();
    // this.list = patListData.PatientList;
    // console.log('@##', this.list);
  }

  patientListData(patients) {
    this.closeDetail = false;
    setTimeout(() => {
      this.patientList = patients;
       console.log('fdh34rhih', this.patientList);
      this.closeDetail = true;
    }, 100);

     console.log('hey-->>', patients);
  }

  /**
   * OnClickChange Show dropdown reason list
   */
  onClickChange(e) {
     console.log('Referral_status_selected', e.target.value);
    this.selectedReferralItem = e.target.value;
    this.reasonArray = [];
     console.log(this.referralstatus, 'ehsd');

    this.referralstatus.forEach(element => {
      if (element.Status === e.target.value) {
        this.reasonOption = element.Reason;
      }
    });

    for (this.reason in this.reasonOption) {
      this.reasonArray.push(this.reasonOption[this.reason]);
      console.log(this.reasonArray, '------>>>>>>>>>>>..');
    }
    this.selectedReferralStatus = this.selectedReferralItem
    console.log('Referral_status_selected', this.selectedReferralStatus);
  }

  /**
   * Onchange Searching 
   */
  onChangeSearch(e) {
    this.selectedReferralItem = e.target.value;
    this.reasonArray = [];
    //console.log('change----', e
    console.log('change----', e.target.value);
    //this.selectedReasonItem = e.target.value;

  }

  /**
   * Click on button to get the List
   * @param e 
   */
  async onClick(e) {
   
    this.referral_Status = this.selectedReferralItem;
    console.log('referral_status', this.selectedReferralStatus);
    console.log('referral_sub_statu=', this.selectedReferralItem)

    if (this.referral_Status = this.selectedReferralItem) {
    //  const patListData: any = await this.patientsService.getPatientListByReferralStatus();
    //this.searchparam = '?Referral_Status='+this.selectedReferralStatus;

    //this.searchparam = this.selectedReferralStatus;
   //console.log('the final referral status value before calling the service=', this.selectedReferralStatus);
   //console.log('the final referral sub status value before calling the service=', this.selectedReferralItem);
   //this.searchparam = this.selectedReferralStatus+','+this.selectedReferralItem;
   //console.log('searchparam=', this.searchparam);
    const patListData: any = await this.patientsService.getPatientListByReferralStatus_byselection(this.selectedReferralStatus);
   //const patListData: any = await this.patientsService.getPatientListByReferralStatus_byselection(this.searchparam);
      this.list = patListData.PatientList;
    }

  }

}
