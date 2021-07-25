import { Injectable, Input } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { URL_LOGIN } from "../url.constants";

export class User {
  constructor(public status: string) { }
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) { }
  // Provide username and password for authentication, and once authentication is successful, 
  //store JWT token in session
  authenticate(email: string, password: string) {
    return this.httpClient
      .post<any>(URL_LOGIN, { email, password })
      .pipe(
        map(userData => {
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("token", userData.token);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("email");
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("email");
  }
}
