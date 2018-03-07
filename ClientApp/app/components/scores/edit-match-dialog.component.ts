import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IMatch } from './match';
import { IEditMatchDialogData } from './edit-match-dialog-data';

@Component({
  templateUrl: 'edit-match-dialog.component.html',
  styleUrls: ['edit-match-dialog.component.css']
})
export class EditMatchDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditMatchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEditMatchDialogData) { }

  onNoClick(): void {
      this.dialogRef.close();
  }
}
