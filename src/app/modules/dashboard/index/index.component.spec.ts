import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsService } from '../../../services/patients.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { IndexComponent } from './index.component';
import { BrowserModule } from '@angular/platform-browser';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexComponent ],
      imports:  [  
        BrowserModule,
        HttpClientModule,
        HttpModule
      ], schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],

      providers: [ 
        PatientsService,
        NgbModal
       ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   /**
   * Get patient data show on table
   */
  it('Get patient data show on table', async () => {
    let result: any = await component.patientsService.getPatientCallList();
    expect(result);
  });
});
