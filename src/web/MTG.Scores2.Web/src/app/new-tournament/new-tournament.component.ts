import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../shared/services/tournament.service';
import { ITournament } from '../shared/models/tournament';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router) { }

  ngOnInit() {
    this.tournamentForm = this.formBuilder.group({
      name: ['', Validators.required],
      participants: this.formBuilder.array([this.buildParticipant(), this.buildParticipant(), this.buildParticipant()])
    });
  }

  save() {
    if (this.tournamentForm.valid) {
      const tournament = this.tournamentForm.value as ITournament;
      this.tournamentService.addTournament(tournament);

      this.router.navigate(['/tournaments']);
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
}
