import { Component, OnInit } from '@angular/core';
import { iPrice } from 'src/app/interfaces';
import { RestCallsService } from 'src/app/services/rest-calls.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  restError: boolean=false;
  restErrorMessage: string="";
  prices: iPrice[];
  hourPrice: number;
  cleanUpPrice: number;
  barCrewPrice: number;

  constructor(private restCallsService: RestCallsService) { }

  ngOnInit(): void {
    this.getAllPrices();
  }

  populatePriceControls(){
    for (let price of this.prices) {
      if ("cleanUpPrice".toLowerCase() === price.priceType.toLowerCase()) {
        this.cleanUpPrice = price.price;
      }
      if ("hourPrice".toLowerCase() === price.priceType.toLowerCase()) {
        this.hourPrice = price.price;
      }
      if ("barCrewPrice".toLowerCase() === price.priceType.toLowerCase()) {

        this.barCrewPrice = price.price;
      }
    }
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
        })
      }
}
