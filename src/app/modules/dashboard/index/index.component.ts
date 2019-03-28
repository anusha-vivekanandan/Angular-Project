import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { PatientsService } from '../../../services/patients.service';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from "@angular/router";


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private http: HttpClient,private route: ActivatedRoute,) { }
  url = environment.url;
  data : any;
  username: String;
  groups: any;
  currentGroup: any;
  ngOnInit() {
    this.route.params.subscribe( params => this.username = params.id );
    this.setUserSpecifictabs(this.username)
    this.setTabContent('IntakeForm1');
  }
  public getUserGroup(user) {
    return this.http.get(this.url + 'getgroups?username='+user).toPromise();
  }
  public changetab(id){
    const tabs : any = ["IntakeForm","FrontOffice","Admin","Marketing"];
    tabs.forEach(element => {
      if(element==id){
        document.getElementById(element).classList.add('active');
      }
      else{
        document.getElementById(element).classList.remove('active');
      }
    });
  }
  public showTabContent(id){
    const tabs : any = ["IntakeForm1","FrontOffice1","Admin1","Marketing1"];
    tabs.forEach(element => {
      if(element==id){
        document.getElementById(element).className='show';
      }
      else{
        document.getElementById(element).className='hide';
      }
    });
  }
  public async setUserSpecifictabs(username){
    const Groupdata: any = await this.getUserGroup(username);
    this.groups = Groupdata.groups;
    this.groups.forEach(element => {
        this.currentGroup = element.group;
        if(this.currentGroup=='IntakeForm'){
          document.getElementById('IntakeForm').classList.remove('hide');
          document.getElementById('IntakeForm').classList.add('show');
        } if(this.currentGroup=='FrontOffice'){
          document.getElementById('FrontOffice').classList.remove('hide');
          document.getElementById('FrontOffice').classList.add('show');
        } if(this.currentGroup=='Admin'){
          document.getElementById('Admin').classList.remove('hide');
          document.getElementById('Admin').classList.add('show');
        } if(this.currentGroup=='Marketing'){
          document.getElementById('Marketing').classList.remove('hide');
          document.getElementById('Marketing').classList.add('show');
        }
    });
  }

  public setTabContent(id){
    document.getElementById(id).classList.add("show");
  }
}