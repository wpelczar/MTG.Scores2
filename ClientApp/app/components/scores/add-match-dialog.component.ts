import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'add-match-dialog',
  templateUrl: 'add-match-dialog.component.html'
})
export class AddMatchDialogComponent {
  constructor(
    public dialogRef: MdDialogRef<AddMatchDialogComponent>) { }
}
