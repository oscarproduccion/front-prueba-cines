import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = ''
  password = ''
  isLoading = false;
  invalidLogin = false

  @Input() error!: string | null;

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
  }

  checkLogin() {
    this.isLoading = true;
    (this.loginservice.authenticate(this.email, this.password).subscribe(
      data => {
        this.router.navigate([''])
        this.invalidLogin = false
        this.isLoading = false;
      },
      error => {
        this.invalidLogin = true
        if (error.status === 403) {
          this.error = 'Email o contraseña incorrecta'
        } else {
          this.error = error.message;
        }
        this.isLoading = false;
      }
    )
    );

  }

}