import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject, Component } from '@angular/core';
import { IDeleteConfirmationDialogData } from '../models/delete-confirmation-dialog-data';

@Component({
  templateUrl: 'delete-confirmation-dialog.component.html'
})
export class DeleteConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDeleteConfirmationDialogData) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onYesClick(): void {
      this.dialogRef.close(true);
    }
}
