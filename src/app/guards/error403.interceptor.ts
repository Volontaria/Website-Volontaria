import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class Error403Interceptor implements HttpInterceptor {
  constructor(private _snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 403) {
          this._snackBar.open(
            'Vous n\'avez pas accés aux resssources demandées',
            'X',
            {
              duration: 10000,
            }
          );
        }
        return throwError(err);
      })
    );
  }
}
