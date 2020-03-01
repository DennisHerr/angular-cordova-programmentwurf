import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
import { Router } from "@angular/router"

@Injectable({
  providedIn: 'root'
})

export class RequestService {
  baseurl: string = 'http://localhost:3000/';
  endurl: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  login(benutzername: string, passwort: string) {
    if (benutzername == 'Testuser' && passwort == 'PW') {
        // mit cordova speicher plugin
        localStorage.setItem('benutzername', benutzername);
        localStorage.setItem('passwort', passwort);
        localStorage.setItem('autologin', 'true');
        // alert('korrekt');
        this.router.navigate(['/dashboard']);
    } else {
        //alert(benutzername + passwort);
        return false;
    }
  }

  // http request version von login
  loginrequest(benutzername: string, passwort: string) {
    //alert('hirequest');
    if (benutzername == 'Testuser' && passwort == 'PW') {
      this.endurl = 'login_erfolgreich.json';
    } else {
      this.endurl = 'login_fehlschlag.json'
    }
    return this.http.get<any>(`${this.baseurl}${this.endurl}`
    ).pipe(
      map(erg => {
        //alert(erg);
        if(erg.ergebnis.status === 'erfolgreich'){
          localStorage.setItem('benutzername', benutzername);
          localStorage.setItem('passwort', passwort);
          localStorage.setItem('autologin', 'true');
      }
  }),
      catchError(err => throwError(err)));
  }
}
