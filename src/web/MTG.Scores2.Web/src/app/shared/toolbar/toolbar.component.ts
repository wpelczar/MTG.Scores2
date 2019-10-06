import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  authSubscription: Subscription;

  @Input() title: string;

  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authNavStatus$.subscribe(status => this.isAuthenticated = status);
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  signout() {
    this.authService.signout();
  }
}
