import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../shared/services/tournament.service';
import { ITournament } from '../shared/models/tournament';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-tournament',
  templateUrl: './new-tournament.component.html',
  styleUrls: ['./new-tournament.component.scss']
})
export class NewTournamentComponent implements OnInit {
  tournamentForm: FormGroup;
  constructor(
    private tournamentService: TournamentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.tournamentForm = this.formBuilder.group({
      name: ['', Validators.required],
      participants: this.formBuilder.array([this.buildParticipant(), this.buildParticipant(), this.buildParticipant()])
    });
  }

  save() {
    this.spinner.show();
    if (this.tournamentForm.valid) {
      const tournament = this.tournamentForm.value as ITournament;
      this.tournamentService.addTournament(tournament)
      .pipe(finalize(() => {
        this.spinner.hide();
      }))
      .subscribe((createdTournament: ITournament) => {
        console.log('dodano turniej');
        this.router.navigate(['/tournaments']);
      }, (errorResponse: HttpErrorResponse) => {
        this.snackBar.open('Wystąpił błąd podczas dodawania trunieju', 'OK', {
          duration: 2000
        });
      });
    }
  }

  addParticipant() {
    (<FormArray>this.tournamentForm.get('participants')).push(this.buildParticipant());
  }

  buildParticipant(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  removeParticipant(index: number) {
    (<FormArray>this.tournamentForm.get('participants')).removeAt(index);
  }

  unsavedChanges(): boolean {
    return this.tournamentForm.dirty;
  }
}
