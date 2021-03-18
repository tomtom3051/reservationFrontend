import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-popup-save-me',
  templateUrl: './popup-confirmation.component.html',
  styleUrls: ['./popup-confirmation.component.scss']
})

export class PopupConfirmationComponent {
  modalData: any;

  constructor(
    private dialogRef: MatDialogRef<PopupConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.modalData = data;
  }

  noAction() {
    let closeResponse : { action: boolean, nextID: string } = { action: false, nextID: this.modalData.nextID };
    this.dialogRef.close(closeResponse);
  }

  doAction() {
    let closeResponse : { action: boolean, nextID: string } = {action: true, nextID: this.modalData.nextID  };
    this.dialogRef.close(closeResponse);
  }
}
