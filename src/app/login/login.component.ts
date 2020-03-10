import { Component, OnInit } from '@angular/core';
import { CordovaService } from '../cordova.service';
import { RequestService } from '../request.service';
declare var device;
declare var Fingerprint;
declare var NativeStorage;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  deviceready: boolean = false;
  biometricavailable: boolean = false
  matching: boolean = false;
  
  autologin: string = '';
  autologintemplate: boolean = false;
  benutzername: string = '';
  passwort: string = '';

  public logindaten: {
    benutzername: string;
    passwort: string;
  }

  constructor(private requestservice: RequestService) {
    this.logindaten = {
      benutzername: "",
      passwort: ""
    };
  }

  ngOnInit() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  }

   onDeviceReady() {  
    // alternative zu localstorage
    NativeStorage.getItem('benutzername',(key)=> this.benutzername = key);
    NativeStorage.getItem('passwort',(key)=> this.passwort = key);
    NativeStorage.getItem('autologin',(key)=>  key == 'true' ? (this.autologin = key, this.autologintemplate = true) : (this.autologin = key, this.autologintemplate = false));

    this.deviceready = true;
    // this binding
    Fingerprint.isAvailable(isAvailableSuccess.bind(this), isAvailableError.bind(this));

    function isAvailableSuccess(result) {
        //  Prüfung auf Speicher
        if (this.autologin == 'true') {
         this.login(true);
        }
         }
    
    function isAvailableError(error) {
       alert('Sie haben keine biometrische Authentifzierung auf Ihrem Gerät eingerichtet.');
     }
  }

   login(auto?: boolean) {
    if (auto) {
      this.biometricAuth();
    } else {
     this.requestservice.login(this.logindaten.benutzername, this.logindaten.passwort);
    }
  }

  biometricAuth() {
    if (this.autologin == 'true') {
      this.autologintemplate = true;
      Fingerprint.show({
        clientId: "Cordova BIO",
        clientSecret: "password"
        // this binding
      }, successCallback.bind(this), errorCallback.bind(this));
    } else {
      return;
    }

    function successCallback(result){
        this.requestservice.login(this.benutzername, this.passwort);
    }
  
     function errorCallback(err){
    }
  }  

}
