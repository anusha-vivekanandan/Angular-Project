import { Component, OnInit, Input } from '@angular/core';
import { PatientsService } from 'src/app/services/patients.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { splitAtColon } from '@angular/compiler/src/util';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-front-office',
  templateUrl: './front-office.component.html',
  styleUrls: ['./front-office.component.scss']
})
export class FrontOfficeComponent implements OnInit {


  @Input('closeresult') closeresult: any;

  public frontFromData: FormGroup;
  public updateForm: any;

  public patients: any = [];
  public data: any;
  public formData: any;
  /**
   * Get data list on click patientlist
   */
  public dataList: any;
  public commentList: any;

  /** Referral status **/
  valSplit: any;
  public referralstatus: any = [];
  public weeklyCount:any;

  /** consent form **/
  public consentform: Array<any> = [
    {
      data: 'Yes'
    },
    {
      data: 'No'
    },
    {
      data: 'Therapist will bring'
    }
  ];

  /** script form **/
  public scriptform: Array<any> = [
    {
      data: 'Yes'
    },
    {
      data: 'No'
    }
  ];

  constructor(
    public patientsService: PatientsService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {  }

  async ngOnInit() {
    this.buildForm();

    /** Call to referral status service **/
    const refralstatus: any = await this.patientsService.referralStatusService();
    this.referralstatus = refralstatus.Statuses;
    //const wcount: any = await this.patientsService.getWeeklyReffaralsCount();
    //this.weeklyCount=wcount.count;
    /** Get patient data show on table **/
    const patients: any = await this.patientsService.getPatientCallListService();
    // console.log('nuppp', patients);
    this.patients = patients;
     console.log('==>>>>/patlist', this.patients);
  }

  /**
   * Get data from api into form
   */
  getData() {
    /** Split the string here **/
    if (this.dataList.Referral_Status !== "") {
      let con = this.dataList.Referral_Status;
      this.valSplit = con.split(" - ");
      // console.log('split here--', this.valSplit);
    }
    /** Patch Form Value **/
    this.frontFromData.patchValue({
      referral_Status: (this.valSplit[0]) ? this.valSplit[0] : '',
      Consent_Form_Status: (this.dataList) ? this.dataList.Consent_Form_Status : '',
      Script: (this.dataList) ? this.dataList.Script : '',
      patient_ID:(this.dataList) ? this.dataList.patient_ID : ''
    })
  }

  /**
   * Build to Submit Form data
   */
  buildForm() {
    this.frontFromData = this.fb.group({
      patient_ID:(this.dataList) ? this.dataList.patient_ID : '',
      referral_Status: ['', Validators.required],
      Consent_Form_Status: [''],
      DateAssignedToTherapist: [''],
      Script: ['', Validators.required],
      EvaluationDate: [''],
      Comments: ['', Validators.required]
    });
  }

  onClick(data) {
    if (data !== "") {
      this.dataList = data;
      this.getData();
       console.log('d', this.dataList);
      //this.referralstatus = this.referralstatus;
      this.commentList = this.dataList.Comments;
    }
    else {
      this.dataList = null;
    }
  }

  async submit(e) {
    this.updateForm = await this.patientsService.postFrontOfficeFrom(this.frontFromData.value);
    console.log('formdata--->>>>', this.frontFromData.value);
    this.toastr.success('Form Successfully Submitted', '');
    this.resetForm();
  }
  /**
   * Reset intake form data
   */
  resetForm() {
    this.frontFromData.reset();
  }
}
