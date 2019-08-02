import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpEvent,
} from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { State } from '@app/store/reducers';
import * as globalErrorActions from '@app/store/actions';
import { environment } from '@env/environment';
import { RequestOptions, isProblemDetailsError } from '@app/core/models';

@Injectable()
export class ApiService {
  private host: string;

  constructor(protected http: HttpClient, private store: Store<State>) {
    this.host = environment.host;
  }

  public delete<T>(
    url: string,
    options?: RequestOptions,
    showValidationErrorMessage = true,
  ): Observable<T> {
    return this.http
      .delete<T>(`${this.host}${this.host ? '/' : ''}${url}`, options)
      .pipe(
        catchError(error =>
          this.handleError(error, showValidationErrorMessage),
        ),
      );
  }

  public get<T>(
    url: string,
    option?: RequestOptions,
    showValidationErrorMessage?: boolean,
  ): Observable<T>;

  public get<T>(
    url: string,
    option?: RequestOptions & { observe: 'response' },
  ): Observable<HttpResponse<T>>;

  public get(
    url: string,
    option?: RequestOptions & { responseType: 'arraybuffer' },
  ): Observable<ArrayBuffer>;

  public get(
    url: string,
    option?: RequestOptions & { responseType: 'blob' },
  ): Observable<Blob>;

  public get(
    url: string,
    option?: RequestOptions & { responseType: 'blob' } & {
      observe: 'response';
    },
  ): Observable<HttpResponse<Blob>>;

  public get(
    url: string,
    option?: RequestOptions & { observe?: 'body' | 'events' | 'response' } & {
      responseType?: 'blob' | 'arraybuffer';
    },
    showValidationErrorMessage = true,
  ): Observable<any> {
    return this.http
      .get(`${this.host}${this.host ? '/' : ''}${url}`, option)
      .pipe(
        catchError(error =>
          this.handleError(error, showValidationErrorMessage),
        ),
      );
  }

  public patch<T>(
    url: string,
    body: any,
    options?: RequestOptions & { observe?: 'body' | 'events' | 'response' },
  ): Observable<T> {
    return this.http
      .patch<T>(`${this.host}${this.host ? '/' : ''}${url}`, body, options)
      .pipe(catchError(error => this.handleError(error)));
  }

  public post<T>(
    url: string,
    body: any,
    options?: RequestOptions,
    showValidationErrorMessage?: boolean,
  ): Observable<T>;

  public post<T>(
    url: string,
    body: any,
    options?: RequestOptions & { responseType: 'blob' } & {
      observe: 'response';
    },
    showValidationErrorMessage?: boolean,
  ): Observable<HttpResponse<Blob>>;

  public post<T>(
    url: string,
    body: any,
    option?: RequestOptions & { observe: 'events' },
    showValidationErrorMessage?: boolean,
  ): Observable<HttpEvent<T>>;

  public post<T>(
    url: string,
    body: any,
    options?: RequestOptions & { observe?: 'body' | 'events' | 'response' },
    showValidationErrorMessage = true,
  ): Observable<T> {
    return this.http
      .post<T>(`${this.host}${this.host ? '/' : ''}${url}`, body, options)
      .pipe(
        catchError(error =>
          this.handleError(error, showValidationErrorMessage),
        ),
      );
  }

  public put<T>(
    url: string,
    body: any,
    options?: RequestOptions,
  ): Observable<T> {
    return this.http
      .put<T>(`${this.host}${this.host ? '/' : ''}${url}`, body, options)
      .pipe(catchError(error => this.handleError(error)));
  }

  private handleError(
    err: HttpErrorResponse,
    showValidationErrorMessage?: boolean,
  ) {
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', err.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(
        `Backend returned code ${err.status}, body was:`,
        typeof err.error === 'string' ? 'HTML body' : err.error,
      );
    }

    if (err.status === 401) {
      this.store.dispatch(
        globalErrorActions.addGlobalError({
          error: { ...err.error, title: 'MESSAGES.LOGIN_EXPIRED' },
        }),
      );
    } else if (
      (err.status !== 422 && err.status !== 404) ||
      showValidationErrorMessage
    ) {
      this.store.dispatch(
        globalErrorActions.addGlobalError({
          error:
            (typeof err.error !== 'string' && { ...err.error }) || err.error,
        }),
      );
    }

    return throwError((isProblemDetailsError(err.error) && err.error) || err);
  }
}
