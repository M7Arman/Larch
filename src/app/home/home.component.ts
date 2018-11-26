import { AuthenticationService } from './../services/AuthenticationService';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private progressValue = 0;
  private maxVal = 100; // Default size of progress bar

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  get progress(): number {
    return this.progressValue;
  }

  get maxValue(): number {
    return this.maxVal;
  }

  public onFoo() {
    const min = 1 / 2; // the time of the progress bar in minutes
    const duration = (min * 1000 * 60) / (100 - this.progressValue);
    const source = timer(0, duration);
    const subscribe = source.subscribe(val => {
      this.progressValue = val;
      if (this.progressValue >= this.maxVal) {
        subscribe.unsubscribe();
      }
    });
    subscribe.add(() => {
      console.log('The end of Progress bar!');
    });
  }

  private speedUp() {
    this.maxVal -= 10; // This will speed up progress bar
    console.log('this.maxVal :', this.maxVal);
  }

  private speedDown() {
    this.progressValue--;
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
