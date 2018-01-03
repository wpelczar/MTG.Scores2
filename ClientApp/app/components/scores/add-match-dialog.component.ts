import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IMatch } from './match';
import { IAddMatchDialogData } from './add-match-dialog-data';

@Component({
  selector: 'add-match-dialog',
  templateUrl: 'add-match-dialog.component.html',
  styleUrls: ['add-match-dialog.component.css']
})
export class AddMatchDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddMatchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAddMatchDialogData) { }

  onNoClick(): void {
      this.dialogRef.close();
  }
}
