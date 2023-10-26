import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demoNG';


  constructor(public http: HttpClient) { }

  register() {
    let user = {
      "userName": "NouvelUtilisateur",
      "email": "nouvel@utilisateur.com",
      "password": "Passw0rd!",
      "passwordConfirm": "Passw0rd!"
    }

    this.http.post<any>('https://localhost:7011/api/Account/Register', user).subscribe(res => console.log(res));
  }

  login() {
    let user = {
      "userName": "NouvelUtilisateur",
      "password": "Passw0rd!",
    }

    this.http.post<any>('https://localhost:7011/api/Account/Login', user).subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res.token);
    });
  }

  callapi() {
    let token = localStorage.getItem('token');

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + token
      })
    };

    this.http.get<any>('https://localhost:7011/api/cats', httpOptions).subscribe(res => console.log(res));
  }

  addcat() {
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

    this.http.post<any>('https://localhost:7011/api/cats', cat, httpOptions).subscribe(res => console.log(res));
  }

  logout() {
    localStorage.removeItem('token');
  }
}
