import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss']
})
export class MarketingComponent implements OnInit {

  public data: any = [];
  public marketFormData: FormGroup;

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
  public selectedReasonItem: any;
  public referral_Status: any;
  public selectedReferralStatus: any;
  public weeklyCount:any;

  constructor(
    public patientsService: PatientsService,
    public fb: FormBuilder
  ) {
  }

  async ngOnInit() {

    // this.buildForm();

    /**  call to Referral status service  **/
    const status: any = await this.patientsService.referralStatusService();
    this.referralstatus = status.Statuses;
    //const wcount: any = await this.patientsService.getWeeklyReffaralsCount();
    //this.weeklyCount=wcount.count;
  }
  /**
   * Build referral status and reason data
   */
  // buildForm() {
  //   this.marketFormData = this.fb.group({
  //     referral_Status: [''],
  //     reason: ['']
  //   })

  // }


  patientListData(patients) {
    this.closeDetail = false;
    setTimeout(() => {
      this.patientList = patients;
      // console.log('fdh34rhih', this.patientList);
      this.closeDetail = true;
    }, 200);
  }

  /**
   * OnClickChange Show dropdown reason list
   */
  onClickChange(e) {
    // console.log('change', e.target.value);
    this.selectedReferralItem = e.target.value;
    this.reasonArray = [];
    // console.log(this.referralstatus, 'ehsd');

    this.referralstatus.forEach(element => {
      if (element.Status === e.target.value) {
        this.reasonOption = element.Reason;
      }
    });

    for (this.reason in this.reasonOption) {
      this.reasonArray.push(this.reasonOption[this.reason]);
      // console.log(this.reasonArray, '------>>>>>>>>>>>..');
    }
    this.selectedReferralStatus = this.selectedReferralItem
    console.log('Referral_status_selected', this.selectedReferralStatus);
  }

  /**
   * Onchange Searching 
   */
  async onChangeSearch(e) {
    console.log('change----', e.target.value);
    this.selectedReasonItem = e.target.value;

  }

  /**
   * Click on button to get the List
   * @param e 
   */
  async onClick(e) {
    this.referral_Status = this.selectedReferralItem;
    // console.log('test', this.referral_Status);

    if (this.referral_Status = this.selectedReferralItem) {
      console.log('the final referral status value before calling the service=', this.selectedReferralStatus);
     // const patListData: any = await this.patientsService.getPatientListByReferralStatus();
     const patListData: any = await this.patientsService.getPatientListByReferralStatus_byselection(this.selectedReferralStatus);
      this.list = patListData.PatientList;
    }

  }
}

