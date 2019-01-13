import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IMatch } from '../models/match';
import { IEditMatchDialogData } from '../models/edit-match-dialog-data';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { IPlayer } from '../models/player';

function matchFormValidator(c: AbstractControl): { [key: string]: boolean } | null {
  const player1Control = c.get('selectedPlayer1');
  const player2Control = c.get('selectedPlayer2');
  const player1Score = c.get('player1Score');
  const player2Score = c.get('player2Score');

  let scoreValid = true;
  let selectedPlayersValid = true;

  if ((player1Control.value as IPlayer).id === (player2Control.value as IPlayer).id) {
    selectedPlayersValid = false;
  }

  if ((player1Score.value !== 2 && player2Score.value !== 2) || (player1Score.value === player2Score.value)) {
    scoreValid = false;
  }

  if (scoreValid && selectedPlayersValid) {
    return null;
  }

  return { 'differentPlayers': !selectedPlayersValid, 'score': !scoreValid };
}


@Component({
  templateUrl: 'edit-match-dialog.component.html',
  styleUrls: ['edit-match-dialog.component.scss']
})
export class EditMatchDialogComponent implements OnInit {
  matchForm: FormGroup;
  formSubmitAttempt: boolean;

  ngOnInit(): void {
    this.matchForm = this.formBuilder.group({
      player1Score: [this.data.player1Score, [Validators.min(0), Validators.max(2), Validators.required]],
      player2Score: [this.data.player2Score, [Validators.min(0), Validators.max(2), Validators.required]],
      selectedPlayer1: [this.data.selectedPlayer1, []],
      selectedPlayer2: [this.data.selectedPlayer2, []]
    }, {validator: matchFormValidator});
  }
  constructor(
    public dialogRef: MatDialogRef<EditMatchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IEditMatchDialogData,
    private formBuilder: FormBuilder) { }

  save(): void {
    this.formSubmitAttempt = true;
    if (this.matchForm.valid) {
      console.log('Saved: ' + JSON.stringify(this.matchForm.value));
      this.dialogRef.close(this.matchForm.value as IEditMatchDialogData);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
