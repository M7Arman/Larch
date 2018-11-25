import { AuthenticationService } from './../services/AuthenticationService';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  public foo() {
    this.authService.foo().subscribe(arg => console.log(arg));
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
