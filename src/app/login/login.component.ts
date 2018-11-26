import { AuthenticationService } from './../services/AuthenticationService';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public invalidData = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    const user: User = this.form.value;
    this.authenticationService.login(user).subscribe(
      () => {
        this.router.navigate(['/home']);
      },
      err => {
        console.error('Error:', this.form.value);
        this.invalidData = true;
        this.form.patchValue({
          email: '',
          password: ''
        });
        // TODO: show error
      }
    );
  }
}
