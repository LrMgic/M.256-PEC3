import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/Models/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0.2,
        })
      ),
      transition('void <=> *', animate(1500)),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  credentials: Credentials;
  email!: FormControl;
  password!: FormControl;
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.credentials = new Credentials();
  }

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', Validators.required);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  checkLogin(): void {
    console.log(
      'Email: ' + this.email.valid + ' Password: ' + this.password.valid
    );
    this.router.navigate(['cards']);
  }

  getErrorMessage(): string {
    if (this.password.hasError('required')) {
      return 'You must enter a password';
    } else {
      return '';
    }
  }
}
