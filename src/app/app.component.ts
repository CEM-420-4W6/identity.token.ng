import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demoNG';


  constructor(public http: HttpClient) { }

  async register() {
    let user = {
      "userName": "NouvelUtilisateur",
      "email": "nouvel@utilisateur.com",
      "password": "Passw0rd!",
      "passwordConfirm": "Passw0rd!"
    }

    let res = await lastValueFrom(this.http.post<any>('https://localhost:7011/api/Account/Register', user));
    console.log(res);
  }

  async login() {
    let user = {
      "userName": "NouvelUtilisateur",
      "password": "Passw0rd!",
    }

    let res = await lastValueFrom(this.http.post<any>('https://localhost:7011/api/Account/Login', user));
    console.log(res);
    localStorage.setItem('token', res.token);
  }

  async callapi() {
    let token = localStorage.getItem('token');

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      })
    };

    let res = await lastValueFrom(this.http.get<any>('https://localhost:7011/api/cats', httpOptions))
    console.log(res);
  }

  async addcat() {
    let token = localStorage.getItem('token');

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      })
    };

    let cat = {
      id: 0,
      name: 'Dali'
    }

    let res = await lastValueFrom(this.http.post<any>('https://localhost:7011/api/cats', cat, httpOptions))
    console.log(res);
  }

  logout() {
    localStorage.removeItem('token');
  }
}
