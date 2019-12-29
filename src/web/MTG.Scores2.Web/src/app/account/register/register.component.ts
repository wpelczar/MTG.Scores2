import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { UserRegistration } from 'src/app/shared/models/user-registration';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

function passwordValidator(c: AbstractControl): { [key: string]: boolean } | null {
  const pass = c.value as string;
  const passRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})');

  if (!pass || !passRegex.test(pass)) {
      return {'passwordFormat': true};
  }

  return null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  success: boolean;
  error: boolean;

  submitted = false;
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [passwordValidator]]
    });
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }

    this.error = false;
    this.spinner.show();

    this.authService.register(<UserRegistration>this.registerForm.value)
      .pipe(finalize(() => {
        this.spinner.hide();
      }))
      .subscribe(
        result => {
          if (result) {
            this.success = true;
          }
        },
        error => {
          this.error = true;
        });
  }
}
