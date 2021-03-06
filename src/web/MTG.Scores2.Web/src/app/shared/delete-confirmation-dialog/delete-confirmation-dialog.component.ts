import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject, Component } from '@angular/core';
import { IDeleteConfirmationDialogData } from '../models/delete-confirmation-dialog-data';

@Component({
  templateUrl: 'delete-confirmation-dialog.component.html',
  styleUrls: ['delete-confirmation-dialog.component.scss']
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
