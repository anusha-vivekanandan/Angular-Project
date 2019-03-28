import { Component, OnInit, Input } from '@angular/core';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-call-patients',
  templateUrl: './call-patients.component.html',
  styleUrls: ['./call-patients.component.scss']
})
export class CallPatientsComponent implements OnInit {


  @Input('closeresult') closeresult: any;
  
  public patients: any = [];
  public data;

  /** Referral status **/
  public referralstatus: any = [];
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

  constructor(public patientsService: PatientsService) { }

  async ngOnInit() {
 

    /** Call to referral status service **/
    const refralstatus: any = await this.patientsService.referralStatusService();
    this.referralstatus = refralstatus.Statuses;

    /** Get patient data show on table **/
    const patients: any = await this.patientsService.getPatientCallListService();
    // console.log('nuppp', patients);
    this.data = patients;
    // console.log('data', JSON.parse(patients));
    this.patients= this.data;
    // console.log('==>>>>/',this.patients);
  }

}
