import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientsService } from 'src/app/services/patients.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-listby-referral',
  templateUrl: './admin-listby-referral.component.html',
  styleUrls: ['./admin-listby-referral.component.scss']
})
export class AdminListbyReferralComponent implements OnInit {

  @Input('patientList') patientList: any;

  public showFormData: FormGroup;
  public data: any;
  public commentList: any;

  /** submit form **/
  public updateForm: any;

  /** Referral source **/
  referralsource: any;

  /** Supervising therapist **/
  therapist: any;

  /** Treating therapist **/
  treating: any;

  /** Displine field **/
  public disc: any;

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
  

   /** api call to External Referral method **/
// once this is completed, commentout the above section
  // ------to be finished with replacing patitent service
   //const externalreferral: any = await this.admin.externalofreferralservice();
   //this.referralsource = externalofreferral.Items;
   // console.log('14521',this.referralsource);


  constructor(
    private fb: FormBuilder,
    public patientsService: PatientsService,
    private toastr: ToastrService) {

  }

  async ngOnInit() {
    this.data = this.patientList;
     console.log('In data child', this.patientList);
     console.log('In data', this.data);
    this.buildData();
    this.getData();

    this.commentList = this.data.Comments;
    
    this.insurance = await this.patientsService.getInsuranceProviders();
    /** api call to Decipline method **/
    const disciplines: any = await this.patientsService.diciplineService();
    this.disc = [];

    for (let d in disciplines) {
      // console.log('888', this.disc[d]);
      this.disc.push(disciplines[d])

    }

    /** api call to Source Referral method **/
    const sourcereferral: any = await this.patientsService.sourceOfReferralService();
    this.referralsource = sourcereferral.Items;
    // console.log('14521',this.referralsource);

    /** api call to Supervising therapist method **/
    const supervising: any = await this.patientsService.supervisingTherapistService();
    this.therapist = supervising.therapists;
    

    /** api call to treating therapist method **/
    const treat: any = await this.patientsService.treatingTherapistService();
    this.treating = treat.therapists;
  }

  /**
   * Get form data from json
   */
  getData() {
    this.showFormData.patchValue({
      // Date_of_Referral: (this.data) ? this.data.Date_of_Referral : '',
      // patientFirstName: (this.data) ? this.data.Patient_First_Name : '',
      // dateOfBirth: (this.data) ? this.data.Date_of_Birth : '',
      patient_ID: (this.data) ? this.data.patient_ID : '',
      insurance: (this.data) ? this.data.Insurance : '',
      serviceLocation: (this.data) ? this.data.Service_Location : '',
      discipline: (this.data) ? this.data.Discipline : '',
      address: (this.data) ? this.data.Address : '',
      city: (this.data) ? this.data.City : '',
      state: (this.data) ? this.data.State : '',
      zip: (this.data) ? this.data.Zip : '',
      patientContactNumber: (this.data) ? this.data.Patient_contact_Number : '',
      sourceOfReferral: (this.data) ? this.data.Source_Of_Referral : '',
      externalReferralName: (this.data) ? this.data.External_Referral_name : '',
      supervising: (this.data) ? this.data.supervising_Therapist : '',
      treating: (this.data) ? this.data.Treating_Therapist : '',
      physicianName: (this.data) ? this.data.Physician_Name : '',
      physicianOffice: (this.data) ? this.data.Physician_Office : '',
      physicianContact: (this.data) ? this.data.Physician_office_Contact_Number : '',
      consent: (this.data) ? this.data.Consent_Form_Status : '',
      script: (this.data) ? this.data.Script : '',
      // comment: [(this.patientList.Comments) ? this.patientList.Comments : '', [Validators.required, Validators.maxLength(2000)]],
    });

  }

  /**
   * Build Form
   */
  buildData() {
    this.showFormData = this.fb.group({
      patient_id: [(this.data) ? this.data.patient_ID : ''],
      // Date_of_Referral: [(this.data) ? this.data.Date_of_Referral : ''],
      // patientFirstName: [(this.data) ? this.data.Patient_First_Name : ''],
      // dateOfBirth: [(this.data) ? this.data.Date_of_Birth : ''],
      insurance: [(this.data) ? this.data.Insurance : ''],
      serviceLocation: [(this.data) ? this.data.Service_Location : ''],
      discipline: [(this.data) ? this.data.Discipline : ''],
      address: [(this.data) ? this.data.Address : ''],
      city: [(this.data) ? this.data.City : ''],
      state: [(this.data) ? this.data.State : ''],
      zip: [(this.data) ? this.data.Zip : ''],
      patientContactNumber: [(this.data) ? this.data.Patient_contact_Number : ''],
      sourceOfReferral: [(this.data) ? this.data.Source_Of_Referral : ''],
      externalReferralName: [(this.data) ? this.data.External_Referral_name : ''],
      supervising: [(this.data) ? this.data.supervising_Therapist : ''],
      treating: [(this.data) ? this.data.Treating_Therapist : ''],
      physicianName: [(this.data) ? this.data.Physician_Name : ''],
      physicianOffice: [(this.data) ? this.data.Physician_Office : ''],
      physicianContact: [(this.data) ? this.data.Physician_office_Contact_Number : ''],
      consent: [(this.data) ? this.data.Consent_Form_Status : ''],
      script: [(this.data) ? this.data.Script : ''],
      Comments: ['', Validators.required]
    });
  }
  /**
   * onClick submit the form
   */
  async submit(data) {
    this.updateForm = await this.patientsService.postFrontOfficeFrom(this.showFormData.value);
    console.log('formdata--->>>>', this.showFormData.value);
    this.toastr.success('sudhakar ----- Form Successfully Submitted', '');
    this.resetForm();
  }
  /**
   * Reset intake form data
   */
  resetForm() {
    this.showFormData.reset();
  }
}
