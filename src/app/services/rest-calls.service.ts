import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestCallsService {

  private postReservationUrl = '/api/requestReservation';
  private getAllReservationsUrl = '/api/admin/getAllReservations';
  private getMyReservationsUrl = '/api/getMyReservations';
  private getTestAuthUserUrl = '/api/auth/user';
  private getTestAuthAdminUrl = '/api/auth/admin';
  private getTestAuthAnonUrl = '/api/auth/anon';
  private getChangeStatusUrl = "/api/admin/newStatus";
  private getAllStatusUrl = "/api/admin/getAllStatus";
  private getAllClientsUrl = "/api/admin/getAllClients";
  private postSearchRequestUrl = "/api/searchReservation";
  private getAllPricesUrl = "/api/getAllPrices";
  private postSavePricesUrl = "/api/admin/savePrices";

  constructor(private httpClient: HttpClient) { }


  getAllPrices() {
    let myUrl = this.getAllPricesUrl;
    console.log("calling: " + myUrl);
    return this.httpClient.get(myUrl,httpOptions).pipe(
      catchError(this.handleError));
  }


  updateReservationStatus(requestID: string, status:string){
    let myUrl = this.getChangeStatusUrl + "/" + requestID  + "/"  + status ;
    console.log("calling: " + myUrl);
    return this.httpClient.get(myUrl,httpOptions).pipe(
      catchError(this.handleError));
  }

  getAllStatus() {
    let myUrl = this.getAllStatusUrl;
    console.log("calling: " + myUrl);
    return this.httpClient.get(myUrl,httpOptions).pipe(
      catchError(this.handleError));
  }

  getAllClients() {
    let myUrl = this.getAllClientsUrl;
    console.log("calling: " + myUrl);
    return this.httpClient.get(myUrl,httpOptions).pipe(
      catchError(this.handleError));
  }

  getAllReservations() {
    let myUrl = this.getAllReservationsUrl;
    console.log("calling: " + myUrl);
    return this.httpClient.get(myUrl,httpOptions).pipe(
      catchError(this.handleError));
  }
  
  getMyReservations() {
    let myUrl = this.getMyReservationsUrl;
    console.log("calling: " + myUrl);
    return this.httpClient.get(myUrl,httpOptions).pipe(
      catchError(this.handleError));
  }

  postReservationRequest(postObject){
    return this.httpClient.post(this.postReservationUrl, postObject, httpOptions).pipe(
      catchError(this.handleError));
  }

  postSavePricesRequest(postObject){
    return this.httpClient.post(this.postSavePricesUrl, postObject, httpOptions).pipe(
      catchError(this.handleError));
  }

  postSearchRequest(postObject){
    return this.httpClient.post(this.postSearchRequestUrl, postObject, httpOptions).pipe(
      catchError(this.handleError));
  }


  getTestAuthAnon() {
    let myUrl = this.getTestAuthAnonUrl;
    console.log("calling: " + myUrl);
    return this.httpClient.get(myUrl,httpOptions).pipe(
      catchError(this.handleError));
  }

  getTestAuthUser() {
    let myUrl = this.getTestAuthUserUrl;
    console.log("calling: " + myUrl);
    return this.httpClient.get(myUrl).pipe(
      catchError(this.handleError));
  }

  getTestAuthAdmin() {
    let myUrl = this.getTestAuthAdminUrl;
    console.log("calling: " + myUrl);
    return this.httpClient.get(myUrl).pipe(
      catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error

      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  
}
