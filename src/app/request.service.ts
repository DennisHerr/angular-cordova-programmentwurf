import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
import { Router } from "@angular/router"
declare var NativeStorage;

@Injectable({
  providedIn: 'root'
})

export class RequestService {
  baseurl: string = 'http://localhost:3000/';
  endurl: string = '';

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) { }

  login(benutzername: string, passwort: string) {
    if (benutzername == 'Testuser' && passwort == 'PW') {
        // mit cordova speicher plugin
        NativeStorage.setItem('benutzername', benutzername);
        NativeStorage.setItem('passwort', passwort);
        NativeStorage.setItem('autologin', 'true');
        NativeStorage.setItem('loggedin', 'true');

        // alert('korrekt');
        // Angular 9 + Cordova 9.0.0 Bugfix
        this.ngZone.run(() =>  this.router.navigate(['/dashboard']));
    } else {
        alert('Zugangsdaten ungültig')
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
