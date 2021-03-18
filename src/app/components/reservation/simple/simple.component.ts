import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestCallsService } from 'src/app/services/rest-calls.service';
import { iReservation, iReservations } from 'src/app/interfaces';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss']
})
export class SimpleComponent implements OnInit {
  reservationFormGroup: FormGroup;
  todayDate:Date = new Date();
  restError: boolean;
  restErrorMessage: string;
  reservationArray: iReservations;

  newvar: any;

  constructor(private formBuilder: FormBuilder,
        private restCallsService: RestCallsService) { }

  resetFormFields() {
    this.reservationFormGroup = this.formBuilder.group({
      reservationDate: ['', Validators.required],
      duration: [8, Validators.required],
      cleanUpCrew: false,
      barCrew: false,
      numberOfGuests: 50
    })
  }
  
  refreshResults(){
    console.log("refresh");
    this.getMyreservation();
  }

  ngOnInit(): void {
    this.resetFormFields();
    this.getMyreservation();
  }

  getMyreservation() {
    this.restError = false;
    this.restErrorMessage = "";
    this.restCallsService.getMyReservations()
    .subscribe(
      (response: iReservations) => {
      this.reservationArray = response;
      console.log(this.reservationArray);
    },
    error => {
      console.log("error");
      this.restError = true;
      this.restErrorMessage = error;
    })
  }


  saveReservation() {
    console.log("save");
    this.restError = false;
    this.restErrorMessage = "";
    //todo check date fix previous day issue
    this.restCallsService.postReservationRequest(JSON.stringify(this.reservationFormGroup.value))
    .subscribe((response:iReservation) => {
      console.log(response);
      if (response.status == 'requested') {
        console.log("success");
        this.getMyreservation();
      }
      else {
        console.log("faillure");
      }
    },
    error => {
      console.log("error");
      this.restError = true;
      this.restErrorMessage = error;
    })
  }

  get reservationDate() {return this.reservationFormGroup.get('reservationDate');}
  get duration() {return this.reservationFormGroup.get('duration');}
  get cleanUpCrew() {return this.reservationFormGroup.get('cleanUpCrew');}
  get barCrew() {return this.reservationFormGroup.get('barCrew');}
  get numberOfGuests() {return this.reservationFormGroup.get('numberOfGuests');}

}
