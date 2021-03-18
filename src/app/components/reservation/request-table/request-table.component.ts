import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { iReservation, iReservations } from 'src/app/interfaces';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RestCallsService } from 'src/app/services/rest-calls.service';

@Component({
  selector: 'request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.scss']
})
export class RequestTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input()  reservationArray: iReservations;
  @Output() onChangeSignal = new EventEmitter<any>();
  
  dataSource: any;
  restError: boolean;
  restErrorMessage: string;
  
  displayedColumns: string[] = ['reservationDate','duration', 'status', 'numberOfGuests', 'barCrew', 'cleanUpCrew','price', 'actions'];

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
   this.dataSource.sort = this.sort;
  }
  
  ngOnChanges(changes: SimpleChanges): void{
    this.dataSource = new MatTableDataSource(this.reservationArray.reservations);
  }

  ngOnInit(): void {
    console.log(this.reservationArray);
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
