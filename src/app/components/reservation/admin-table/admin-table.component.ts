import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { iReservation, iReservations } from 'src/app/interfaces';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RestCallsService } from 'src/app/services/rest-calls.service';

@Component({
  selector: 'admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss']
})
export class AdminTableComponent implements OnInit, OnChanges, AfterViewInit   {
  @Input()  reservationArray: iReservations;
  @Output() onChangeSignal = new EventEmitter<any>();

  dataSource: any;
  restError: boolean;
  restErrorMessage: string;
  
  displayedColumns: string[] = ['reservationDate','duration', 'clientID', 'status', 'numberOfGuests', 'barCrew', 'cleanUpCrew','price', 'actions'];

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
   this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void{
    this.dataSource = new MatTableDataSource(this.reservationArray.reservations);
  }

  isDateAfterToday(reservationDate):boolean {
    let rDate = new Date(reservationDate);
    let today:Date = new Date();

    if (rDate>today){
      return true;
    }
    return false;
  }
  
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.reservationArray.reservations);
  }

  updateStatus(requestID: string, status: string) {
    console.log("updating");
    this.restError = false;
    this.restErrorMessage = "";
    this.restCallsService.updateReservationStatus(requestID, status)
      .subscribe(response => {
        this.onChangeSignal.emit(response);
      },
        error => {
          console.log("error");
          this.restError = true;
          this.restErrorMessage = error;
        })
  }
  
  constructor(private restCallsService: RestCallsService) { }
}
