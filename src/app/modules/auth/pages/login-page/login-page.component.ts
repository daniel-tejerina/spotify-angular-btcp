import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  errorSession: boolean = false;
  formLogin: FormGroup = new FormGroup({});

  constructor(private _authService: AuthService, private cookie: CookieService, private router: Router) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl("" , [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])
    })
  }

  sendLogin(): void {
    const { email, password } = this.formLogin.value; 
    this._authService.sendCredentials(email, password).subscribe({
      next: responseOk => {
        console.log("Sesion iniciada correctamente");
        const { tokenSession, data } = responseOk;
        this.cookie.set("token", tokenSession, 4, "/")
        this.router.navigate(["/", "tracks"])
      },
      error: err => {
        this.errorSession = true;
        console.log("Error! Usuario o contraseña incorrecta");
      }
    })
    // DEPRECATED FORM
    // .subscribe(responseOk => {
    //   console.log("Sesion iniciada correctamente");
    // }, err => {
    //   console.log("Error! Usuario o contraseña incorrecta")
    // })
  }
}
