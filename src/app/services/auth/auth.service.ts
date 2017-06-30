import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class AuthService {

  loggedIn: boolean

  constructor(private http: Http) {
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    const token = localStorage.getItem("authToken")

    if (token) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  sendRegistration(email: string, password: string, memberType: number) {
    return this.http.post('/api/v1/auth', {
      email,
      password,
      memberType
    })
    .toPromise()
    .then(response => {
      const token = response.json().authToken
      localStorage.setItem('authToken', token)
      this.loggedIn = true
    })
    .catch(err => {
      throw err;
    })
  }

  login(email: string, password: string) {
    return this.http.get(`/api/v1/auth?email=${email}&password=${password}`)
    .toPromise()
    .then(response => {
      const token = response.json().authToken
      localStorage.setItem('authToken', token)
      this.loggedIn = true
    })
  }
}
