import { Injectable } from '@angular/core';
import { ErrorDialogService } from './../shared/error-dialog/error-dialog.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(public errorDialogService: ErrorDialogService, private toastr: ToastrService) { }

    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     const changedReq = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    //     return next.handle(changedReq).pipe(catchError(err => {
    //         const error = err.error.message || err.message;  // to send error message if error occurs in web api
    //         this.toastr.success(error);
    //         // this.snackbar.open(error, 'Close', {
    //         //   duration: 2000
    //         // });
    //         return throwError(error);
    //     }));
    // }



    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('token');

        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data: any = {
                    reason: error && error.message ? error.message : '',
                    status: error.status
                };
                // this.errorDialogService.openDialog(data);
                this.toastr.error('Status: ' + data.status, data.reason);
                return throwError(error);
            }));
    }


}