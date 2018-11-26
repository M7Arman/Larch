import { AuthenticationService } from './../services/AuthenticationService';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    this.authService.foo().subscribe(arg => console.log(arg));
    const min = 1 / 4; // the time of the progress bar in minutes
    const duration = ((min * 1000 * 60) / (100 - this.progressValue));
    const timer = setInterval(() => {
      this.progressValue++;
      if (this.progressValue >= this.maxVal) {
        clearInterval(timer);
      }
    }, duration);
  }

  private speedUp() {
    this.maxVal -= 10; // This will speed up progress bar
    console.log('this.maxVal :', this.maxVal);
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
