import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerConfig, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { PatientsService } from 'src/app/services/patients.service';
import { ToastrService } from 'ngx-toastr';
// import { ToastrModule } from 'ngx-toastr';
// import { Router, ActivatedRoute } from '@angular/router';
//import { SharedDataService } from "../../../services/shareddata.service";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-intake-form',
  templateUrl: './intake-form.component.html',
  styleUrls: ['./intake-form.component.scss']
})
export class IntakeFormComponent implements OnInit {

  userid: String;

   /** Date picker  **/
  dateOfBirth: NgbDateStruct;
  // date: any = new Date();

  /** patient Intake form **/
  public patientintake: FormGroup;
  public submitForm: any;

  /** Referral Status **/
  public referralstatus: any = [];

  /** Reason dropdown list **/
  public reasonArray = [];
  public reasonOption: any;

  /** update Address **/
  public updateAddress: any;
  public updateCity: any;
  public updateState: any;
  public updateZip: any;

  /** Descipline  **/
  public decipline: any = [];
  public data;

  /** Source Referral  **/
  public referralsource: any = [];

  /** Supervising Therapist **/
  public therapist: any = [];

  /** Treating threapist **/
  public treating: any = [];

  //public userid: string;

  /** Insurance **/
  public insurance: any ; 
  

  /** Service location */
  public service: Array<any> = [
    { location: 'Clinic' },
    { location: 'Home' },
    { location: 'Daycare' }
  ];

  /** physician office  **/
  public physicianoffice: Array<any> = [
    {
      office: {
        officeName: 'childcare',
        contactName: 'Andy Hyte'
      }
    }
  ];

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

  /**
   * Call construct method before ngOninit 
   * and call the services and form
   * @param patientsService 
   * @param fb 
   * @param config 
   */
  constructor(
    private route: ActivatedRoute,
    public patientsService: PatientsService,
    private fb: FormBuilder,
    public config: NgbDatepickerConfig,
    private toastr: ToastrService
     ) {
    config.minDate = { year: 1900, month: 1, day: 1 };
    this.route.params.subscribe( params => this.userid = params.id );
    // config.maxDate = { day: this.date.getUTCDay(), month: this.date.getUTCMonth(), year: this.date.getUTCFullYear() };
  }


  async ngOnInit() {

    this.buildForm();

    //this.userid = localStorage.getItem("username");
    console.log('username from loginpage =', this.userid);
    this.insurance = await this.patientsService.getInsuranceProviders();
    /** api call to Referral Status method **/
    const referralstatus: any = await this.patientsService.referralStatusService();
    this.referralstatus = referralstatus.Statuses;

    /** api call to Decipline method **/
    const disciplines: any = await this.patientsService.diciplineService();

    for (let disp in disciplines) {
      this.data = disciplines[disp];
      this.decipline.push(this.data);
    }


    /** api call to Source Referral method **/
    const sourcereferral: any = await this.patientsService.sourceOfReferralService();
    this.referralsource = sourcereferral.Items;
    // console.log('jack', this.referralsource);

    /** api call to Supervising therapist method **/
    const supervising: any = await this.patientsService.supervisingTherapistService();
    this.therapist = supervising.therapists;

    /** api call to treating therapist method **/
    const treat: any = await this.patientsService.treatingTherapistService();
    this.treating = treat.therapists;
  }

  /**
   * Validation for the form
   */
  public buildForm() {
    this.patientintake = this.fb.group({
      Date_of_Referral: ['', Validators.required],
      Referral_Status: ['', Validators.required],
      Referral_Sub_Status: [''],
      patientLastName: ['', Validators.required],
      patientFirstName: ['', Validators.required],
      patientmiddleName: [''],
      dateOfBirth: ['', Validators.required],
      insurance: ['', Validators.required],
      serviceLocation: ['', Validators.required],
      discipline: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['NC', Validators.required],
      zip: ['', Validators.required],
      patientContactNumber: ['', [Validators.required, Validators.maxLength(10)]],
      sourceOfReferral: ['', Validators.required],
      externalReferralName: ['', [Validators.required, Validators.maxLength(50)]],
      supervising: ['', Validators.required],
      treating: ['', Validators.required],
      physicianName: ['', [Validators.required, Validators.maxLength(50)]],
      physicianOffice: ['', Validators.required],
      physicianContact: ['', Validators.required],
      consent: ['', Validators.required],
      script: ['', Validators.required],
      comment: ['', [Validators.required, Validators.maxLength(2000)]],
      userid:[this.userid,  Validators.required],
    });
  }


  /**
   * Submit intakeForm data in Json format
   * @param data 
   */
  async submit(e) {
    this.submitForm = await this.patientsService.postIntakeFormData(this.patientintake.value);
    // console.log('formdata--->>>>', this.patientintake.value);
    // console.log('successfully created',e);
    this.toastr.success('Form Successfully Submitted', '');
    this.resetForm();
  }

  /**
   * Reset intake form data
   */
  resetForm() {
    this.patientintake.reset();
  }

  /**
   * OnClickChange Show Reason dropdown list
   * @param e 
   */
  onClickChange(e) {
    this.reasonArray = [];
    // console.log('head', this.referralstatus);
    this.referralstatus.forEach(element => {
      if (element.Status === e.target.value) {
        this.reasonOption = element.Reason;
      }
    });

    for (let reason in this.reasonOption) {
      this.reasonArray.push(this.reasonOption[reason]);
      // console.log('---->>>', this.reasonArray);
    }
  }


  /**
   * OnClick Clinic Address Change
   */
  onClickAddressUpdate(e) {
    // console.log('3333', e);
    if (e.target.value === 'Clinic') {
      this.updateAddress = '100, Clinic Avenue',
        this.updateCity = 'Cary ',
        this.updateState = 'NC',
        this.updateZip = '27519'
    }
    else {
      this.updateAddress = null,
        this.updateCity = null,
        this.updateState = null,
        this.updateZip = null
    }
  }
}
