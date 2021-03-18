import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { iPrice, iReservations, iSearchRequest } from 'src/app/interfaces';
import { RestCallsService } from 'src/app/services/rest-calls.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  restError: boolean = false;
  restErrorMessage: string = "";
  reservationArray: iReservations;
  searchFromGroup: FormGroup;
  allStatus: string[];
  allClients: string[];
  todayDate: Date = new Date();
  priceFromGroup: FormGroup;
  prices: iPrice[];

  constructor(
    private restCallsService: RestCallsService,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.resetFormFields();
    this.resetPriceFormField();
    this.getListValues();
    this.getAllPrices();
    this.search();
  }

  resetPriceFormField() {
    this.priceFromGroup = this.formBuilder.group({
      hourPrice: [, Validators.required],
      cleanUpPrice: ['', Validators.required],
      barCrewPrice: ['', Validators.required],
    })
  }

  populatePriceControls() {
    for (let price of this.prices) {
      if ("cleanUpPrice".toLowerCase() === price.priceType.toLowerCase()) {
        this.cleanUpPrice.setValue(price.price);
      }
      if ("hourPrice".toLowerCase() === price.priceType.toLowerCase()) {
        this.hourPrice.setValue(price.price);
      }
      if ("barCrewPrice".toLowerCase() === price.priceType.toLowerCase()) {
        this.barCrewPrice.setValue(price.price);
      }
    }
  }

  populatePricesArray() {
    let price1: iPrice = {
      priceType: "cleanUpPrice",
      price: this.cleanUpPrice.value
    }
    let price2: iPrice = {
      priceType: "hourPrice",
      price: this.hourPrice.value
    }
    let price3: iPrice = {
      priceType: "barCrewPrice",
      price: this.barCrewPrice.value
    }
    this.prices = [];
    this.prices.push(price1);
    this.prices.push(price2);
    this.prices.push(price3);
  }

  get hourPrice() { return this.priceFromGroup.get('hourPrice'); }
  get cleanUpPrice() { return this.priceFromGroup.get('cleanUpPrice'); }
  get barCrewPrice() { return this.priceFromGroup.get('barCrewPrice'); }


  resetFormFields() {
    let start: Date = new Date();
    let end: Date = new Date();
    start.setDate(start.getDate() - 5);
    end.setDate(end.getDate() + 30);

    this.searchFromGroup = this.formBuilder.group({
      startDate: [start, Validators.required],
      endDate: [end, Validators.required],
      status: '',
      client: ''
    })
  }

  refreshResults() {
    console.log("refresh");
    this.search();
  }

  savePrices() {
    console.log("save prices");
    this.populatePricesArray();
    this.restError = false;
    this.restErrorMessage = "";
    this.restCallsService.postSavePricesRequest(this.prices)
      .subscribe(
        (response: iPrice[]) => {
          this.resetPriceFormField();
          this.prices = response;
          this.populatePriceControls();
        },
        error => {
          console.log("error");
          this.restError = true;
          this.restErrorMessage = error;
        })
  }

  search() {
    this.restError = false;
    this.restErrorMessage = "";
    let searchrequest: iSearchRequest = {};
    searchrequest.clientID = this.client.value;
    searchrequest.startDate = this.startDate.value;
    searchrequest.endDate = this.endDate.value;
    searchrequest.status = this.status.value;
    this.restCallsService.postSearchRequest(searchrequest)
      .subscribe(
        (response: iReservations) => {
          this.reservationArray = response;
        },
        error => {
          console.log("error");
          this.restError = true;
          this.restErrorMessage = error;
        })
  }

  get startDate() { return this.searchFromGroup.get('startDate'); }
  get endDate() { return this.searchFromGroup.get('endDate'); }
  get status() { return this.searchFromGroup.get('status'); }
  get client() { return this.searchFromGroup.get('client'); }


  updateStatus(requestID: string, status: string) {
    this.restError = false;
    this.restErrorMessage = "";
    this.restCallsService.updateReservationStatus(requestID, status)
      .subscribe(response => {
        // console.log(response);
        this.getAllreservation();
      },
        error => {
          console.log("error");
          this.restError = true;
          this.restErrorMessage = error;
        })
  }

  getAllPrices() {
    this.restError = false;
    this.restErrorMessage = "";

    this.restCallsService.getAllPrices()
      .subscribe(
        response => {
          this.prices = response as iPrice[];
          this.populatePriceControls();
          //console.log(this.allStatus);
        },
        error => {
          console.log("error");
          this.restError = true;
          this.restErrorMessage = error;
        });
  }



  getListValues() {
    this.restError = false;
    this.restErrorMessage = "";

    this.restCallsService.getAllStatus()
      .subscribe(
        response => {
          this.allStatus = response as string[];
          //console.log(this.allStatus);
        },
        error => {
          console.log("error");
          this.restError = true;
          this.restErrorMessage = error;
        })

    this.restCallsService.getAllClients()
      .subscribe(
        response => {
          this.allClients = response as string[];
          // console.log(this.allClients);
        },
        error => {
          console.log("error");
          this.restError = true;
          this.restErrorMessage = error;
        })

  }

  getAllreservation() {
    this.restError = false;
    this.restErrorMessage = "";
    this.restCallsService.getAllReservations()
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
}
