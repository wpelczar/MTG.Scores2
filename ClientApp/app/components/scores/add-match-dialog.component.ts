import { Component, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { IMatch } from './match';
import { IAddMatchDialogData } from './add-match-dialog-data';

@Component({
  selector: 'add-match-dialog',
  templateUrl: 'add-match-dialog.component.html'
})
export class AddMatchDialogComponent {
  constructor(
    public dialogRef: MdDialogRef<AddMatchDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: IAddMatchDialogData) { }

  onNoClick(): void {
      this.dialogRef.close();
  }
}
