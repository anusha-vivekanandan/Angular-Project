import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  constructor(
    public toastr: ToastrService
  ) { }

  openDialog(data) {
    this.toastr.error('Reason: ' + data.reason, 'Status: ' + data.status);
  }
}
