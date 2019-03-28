import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {

  /**
   * Patient info 
   */
  @Input('patientinfo') patientinfo: any;

  /**
   * OnClose detail box
   */
  @Output('onClose') onClose = new EventEmitter<any>();

  /**
   * EndDate
   */
  public endDate: Date = new Date();
  /**
   * Date difference
   */
  public diff: number;
  /**
   * Hours 
   */
  public hours: number = 0;
  /**
   * Minutes 
   */
  public minutes: number = 0;
  /**
   * Seconds 
   */
  public seconds: number = 0;
  /**
   * Interval 
   */
  public interval = undefined;
  /**
   * Close Result of model dialog 
   */
  public closeResult;

  constructor(public modalService: NgbModal) { }

  ngOnInit() {
    // console.log(this.patientinfo)
  }

  /**
  * OPEN CALL DURATION MODAL DIALOG
  * @param content 
  */
  open(content, t) {
    /*** CALL START/END AND CASE START/END TIME ***/
    let params = {
      CaseStartTime: moment(new Date()).format('H:mm:ss'),
      CaseEndTime: moment(new Date()).format('H:mm:ss'),
      CallStartTime: moment(new Date()).format('H:mm:ss'),
      CallEndTime: moment(new Date()).format('H:mm:ss'),
      Comments: "this is a comment"
    }
    /*** CALL START/END AND CASE START/END TIME CLOSE ***/
    /*** CALL DURATION METHOD  ****/
    this.endDate = new Date();
    this.interval = setInterval(() => {
      this.diff = Math.floor((new Date().getTime() - this.endDate.getTime()));
      this.hours = this.getHours(this.diff);
      this.minutes = this.getMinutes(this.diff);
      this.seconds = this.getSeconds(this.diff);
      console.log(this.diff);
    }, 1000);
    /*** CALL DURATION METHOD CLOSE ****/

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((dialog) => {
      this.closeResult = `Closed with: ${dialog}`;
    }, (reason) => {
      if (this.interval) {
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        clearInterval(this.interval);
        params.CallEndTime = moment(new Date()).format(' H:mm:ss ');
        params.CaseEndTime = moment(new Date()).format(' H:mm:ss ');
      }
      console.log(params);
    });

  }

  /** CALL DURATION HOURS, MINUTES, AND SECONDS  METHOD **/

  /**
   * Calculate the hours 
   * @param t 
   */
  getHours(t) {
    t = t / 3600000;
    return Math.floor(t % 24);
  }

  /**
   * Calculate the minutes 
   * @param t 
   */
  getMinutes(t) {
    t = t / 60000;
    return Math.floor(t % 60);
  }

  /**
   * Calculate the seconds 
   * @param t 
   */
  getSeconds(t) {
    return Math.floor((t / 1000) % 60);
  }

  /**
   * Close the detail box
   */
  close() {
    this.onClose.emit();
  }

}
