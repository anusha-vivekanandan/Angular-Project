import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from 'src/app/services/patients.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-marketing-listby-referral',
  templateUrl: './marketing-listby-referral.component.html',
  styleUrls: ['./marketing-listby-referral.component.scss']
})
export class MarketingListbyReferralComponent implements OnInit {

  @Input('patientList') patientList: any;

  public showFormData: FormGroup;
  public data: any;
  public commentList: any;

  public updateForm: any;

  public decipline: any;
  public dist: any;

  public referralsource: any;

  public therapist: any;

  public treating: any;

  public disc: any = [];
  public display: any;

  /** Referral Status Data **/
  public status: Array<any> = [
    {
      data: 'WebPT Setup'
    },
    {
      data: 'Front Office Action Needed'
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
        officeName: 'Cary',
      }
    },
    {
      office: {
        officeName: 'childcare',
        contactName: 'Andy Hyte'
      },
    },
    {
      office: {
        officeName: 'Adultcare',
        contactName: 'john kyle'
      }
    }
  ];

   /** External referral name **/
   public externalName: Array<any> = [
    {
      firstname: 'John',
      lastname: 'Smith'
    },
    {
      firstname: 'Tom',
      lastname: 'Sting'
    },
    {
      firstname: 'Andrew',
      lastname: 'Gold'
    }
  ];

  constructor(public fb: FormBuilder,
    public patientsService: PatientsService,
    private toastr: ToastrService) {

  }

  async ngOnInit() {
    this.data = this.patientList;
    console.log('5555', this.patientList);
    // console.log('000', this.data);
    this.insurance = await this.patientsService.getInsuranceProviders();
    this.commentList = this.data.Comments;
    this.buildForm();
    this.getData();
    /** api call to Decipline method **/
    const disciplines: any = await this.patientsService.diciplineService();
    this.disc = [];

    for (let d in disciplines) {
      // console.log('888', this.disc[d]);
      this.disc.push(disciplines[d])
      // console.log('555',this.display);
    }

    /** api call to Source Referral method **/
    const sourcereferral: any = await this.patientsService.sourceOfReferralService();
    this.referralsource = sourcereferral.Items;
    // console.log('14521',this.referralsource);

    /** api call to Supervising therapist method **/
    const supervising: any = await this.patientsService.supervisingTherapistService();
    this.therapist = supervising.therapists;
    // console.log('chekc',this.therapist);

    /** api call to treating therapist method **/
    const treat: any = await this.patientsService.treatingTherapistService();
    this.treating = treat.therapists;
  }


  /**
   * Get from data from json
   */
  getData() {
    this.showFormData.patchValue({
      // Date_of_Referral: (this.data) ? this.data.Date_of_Referral : '',
      // patientFirstName: (this.data) ? this.data.Patient_First_Name : '',
      // dateOfBirth: (this.data) ? this.data.Date_of_Birth : '',
      // insurance: (this.data) ? this.data.Insurance : '',
      // serviceLocation: (this.data) ? this.data.Service_Location : '',
      // discipline: (this.data) ? this.data.Discipline : '',
      // address: (this.data) ? this.data.Address : '',
      // city: (this.data) ? this.data.City : '',
      // state: (this.data) ? this.data.State : '',
      // zip: (this.data) ? this.data.Zip : '',
      // patientContactNumber: (this.data) ? this.data.Patient_contact_Number : '',
      // sourceOfReferral: (this.data) ? this.data.Source_Of_Referral : '',
      // externalReferralName: (this.data) ? this.data.External_Referral_name : '',
      // supervising: (this.data) ? this.data.supervising_Therapist : '',
      // treating: (this.data) ? this.data.Treating_Therapist : '',
      // physicianName: (this.data) ? this.data.Physician_Name : '',
      // physicianOffice: (this.data) ? this.data.Physician_Office : '',
      // physicianContact: (this.data) ? this.data.Physician_office_Contact_Number : '',
      // consent: (this.data) ? this.data.Consent_Form_Status : '',
      // script: (this.data) ? this.data.Script : '',
      comment: [this.patientList.Comments],
    });
  }

  /**
   * Build form 
   */
  buildForm() {
    this.showFormData = this.fb.group({
      //patient_id: ['65'],
      patient_id: [(this.data) ? this.data.patient_ID : ''],
      // Date_of_Referral: [(this.data) ? this.data.Date_of_Referral : ''],
      // patientFirstName: [(this.data) ? this.data.Patient_First_Name : ''],
      // dateOfBirth: [(this.data) ? this.data.Date_of_Birth : ''],
      // insurance: [(this.data) ? this.data.Insurance : ''],
      // serviceLocation: [(this.data) ? this.data.Service_Location : ''],
      // discipline: [(this.data) ? this.data.Discipline : ''],
      // address: [(this.data) ? this.data.Address : ''],
      // city: [(this.data) ? this.data.City : ''],
      // state: [(this.data) ? this.data.State : ''],
      // zip: [(this.data) ? this.data.Zip : ''],
      // patientContactNumber: [(this.data) ? this.data.Patient_contact_Number : ''],
      // sourceOfReferral: [(this.data) ? this.data.Source_Of_Referral : ''],
      // externalReferralName: [(this.data) ? this.data.External_Referral_name : ''],
      // supervising: [(this.data) ? this.data.supervising_Therapist : ''],
      // treating: [(this.data) ? this.data.Treating_Therapist : ''],
      // physicianName: [(this.data) ? this.data.Physician_Name : ''],
      // physicianOffice: [(this.data) ? this.data.Physician_Office : ''],
      // physicianContact: [(this.data) ? this.data.Physician_office_Contact_Number : ''],
      // consent: [(this.data) ? this.data.Consent_Form_Status : ''],
      // script: [(this.data) ? this.data.Script : ''],
      Comments: ['', Validators.required],
      Referral_Status: ['']
     });
  }

  /**
   * Submit Form
   */
  async onSubmit(e) {
    this.updateForm = this.patientsService.postFrontOfficeFrom(this.showFormData.value);
    console.log('formdata--->>>>', this.showFormData.value);
    this.toastr.success('Form Successfully Submitted', '');
  }

}
