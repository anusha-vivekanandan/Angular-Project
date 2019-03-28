import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  url = environment.url;

  constructor(private http: HttpClient) { }

  /**
   * Patient call list Service
   */
  public getPatientCallListService() {
    return this.http.get(this.url + 'getPatientCallList-API').toPromise();
  }

  /**
   * Complete Patients Call
   */
  public completeCallPatient() {

  }

  /**
   * Get patient list by Referral Status Service
   */
  public getPatientListByReferralStatus(){
   return this.http.get(this.url + 'getpatientlistbyreferralstatus-API').toPromise();
  }
  /**
   

  /**
   * Get patient list by Referral Status Service
   */
  public getPatientListByReferralStatus_byselection(abc){
    
    console.log('inside the patient service');
    return this.http.get(this.url + 'getpatientlistbyparameters?Referral_Status='+abc).toPromise();    
    }
  /**
  


   * Referral Status
   */
  public referralStatusService() {
    return this.http.get(this.url + 'getreferralstatus').toPromise();
  }

  /**
   * Reason Dropdown Service
   */
  public reasonDropdownService() {
    return this.http.get(this.url + 'getreferralstatus').toPromise();
  }

  /**
   * Insurance Service
   */
  public insuranceService() {
    return of();
  }

  /**
   * Service Location Service
   */
  public serviceLocation() {
    return of();
  }

  /**
   * Dicipline service
   */
  public diciplineService() {
    return this.http.get(this.url + 'getdisciplines').toPromise();
  }

  /**
   * Address Service
   */
  public addressService() {
    return of();
  }

  /**
   * Source of referral Service
   */
  public sourceOfReferralService() {
    return this.http.get(this.url + 'getsourceofreferral').toPromise();
  }

  /**
   * External Reference Name 
   */
  public externalReferenceNameService() {
    return of();
  }

  /**
   * Supervising Therapist Service
   */
  public supervisingTherapistService() {
    return this.http.get(this.url + 'getsupervisingtherapist').toPromise();
  }

  /**
   * Treating Therapist Service
   */
  public treatingTherapistService() {
    return this.http.get(this.url + 'gettreatingtherapist').toPromise();
  }
  /**
   * Physician office Service
   */
  public physicianOfficeService() {
    return of();
  }

  /**
   * Physician office Contact Service
   */
  public physicianOfficeContactService() {
    return of();
  }
  /**
   * Consent form service
   */
  public consentFormService() {
    return of();
  }

  /**
   * Script Service
   */
  public scriptService() {
    return of();
  }


  /**
   * Submit Intake Form Data 
   */
  public postIntakeFormData(data) {
    // console.log('heyyy', data);
    return this.http.post(this.url + 'insertintakeform', data).toPromise();
  }

  /**
   * Send Fron Office Form Data
   */
  public postFrontOfficeFrom(data){
    return this.http.post(this.url + 'updatepatientinfo', data).toPromise();
  }
  /**
   * Get all insurance providers list
   */
  public getInsuranceProviders(){
    return this.http.get(this.url + 'getinsuranceproviders').toPromise();
  }

  public getWeeklyReffaralsCount(){
    return this.http.get(this.url + 'getweeklyreferralscount-api').toPromise();
  }
}
