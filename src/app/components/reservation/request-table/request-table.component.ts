import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { iReservation, iReservations } from 'src/app/interfaces';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RestCallsService } from 'src/app/services/rest-calls.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopupConfirmationComponent } from '../../general/popup-confirmation/popup-confirmation.component';

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
    this.dataSource = new MatTableDataSource(this.reservationArray.reservations);
  }

  cancelRequest(requestID: string) {
    console.log("updating");
    this.restError = false;
    this.restErrorMessage = "";
    this.restCallsService.getCancelRequest(requestID)
      .subscribe(response => {
        this.onChangeSignal.emit(response);
      },
        error => {
          console.log("error");
          this.restError = true;
          this.restErrorMessage = error;
        })

  }

  confirmUpdate(reservationDate:Date, requestID: string) {
    const dialogConfig = new MatDialogConfig();

    let rDate = new Date(reservationDate);
    let dd = String(rDate.getDate()).padStart(2, '0');
    let mm = String(rDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = rDate.getFullYear();
    let dateString = dd+"/"+mm+"/"+yyyy;


    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    let modeldata: {title: string, message: string, confirmButtonText: string} = {
      title: "Reservation " + dateString,
      message: "Are you sure you cancel this reservation?",
      confirmButtonText: "Yes"
    }

    dialogConfig.data = modeldata;
    let dialogRef = this.dialog.open(PopupConfirmationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result.action) {
        this.cancelRequest(requestID);
      }
    });
  }



  
  constructor(private restCallsService: RestCallsService, private dialog: MatDialog) { }
}
