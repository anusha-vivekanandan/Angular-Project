import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  @Input('list') list: Array<any> = [];
  
  /**
   * Onclick show Below field data
   */
  @Output('onClick') onClick = new EventEmitter<any>();

  patientinfo: any;

  closeRightPane: Boolean = false;

  constructor() { }

  ngOnInit() {
  }

  /**
  * show patient data in right pane onclick on table row
  */
  patientData(patients) {
    this.patientinfo = patients;
    this.closeRightPane = true;

    // console.log('hellooooo',this.patientinfo)
    // console.log('hellooooo',this.list)
    this.onClick.emit(this.patientinfo);
  }

  onClose(){
    this.closeRightPane = !this.closeRightPane;
  }

}
