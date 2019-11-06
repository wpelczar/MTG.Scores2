import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators'
import { UserRegistration } from 'src/app/shared/models/user-registration';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  success: boolean;
  error: boolean;
  userRegistration: UserRegistration = { name: '', email: '', password: '' };
  submitted = false;

  constructor(private authService: AuthService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.error = false;
    this.spinner.show();

    this.authService.register(this.userRegistration)
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