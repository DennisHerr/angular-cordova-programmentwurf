import { Component, OnInit } from '@angular/core';
import { CordovaService } from '../cordova.service';
import { RequestService } from '../request.service';
declare var device;
declare var Fingerprint;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  deviceready: boolean = false;
  biometricavailable: boolean = false
  matching: boolean = false;
  autologin: boolean = false;

  public logindaten: {
    benutzername: string;
    passwort: string;
  }

  constructor(private cordovaservice: CordovaService, private requestservice: RequestService) {
    this.logindaten = {
      benutzername: "",
      passwort: "",
    };
    
  }

  ngOnInit() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this),false);
  }

  onDeviceReady() {
    this.deviceready = true;
    // this binding
      Fingerprint.isAvailable(isAvailableSuccess.bind(this),isAvailableError.bind(this));


    function isAvailableSuccess(result) {
        //  Prüfung auf Speicher
         alert(result);
         this.login(true);
         }
    
    function isAvailableError(error) {
       // 'error' will be an object with an error code and message
       alert(error.message);
     }
  }


  public login(auto?: boolean) {
    if (auto) {
     // alert(`auto: ${auto}`);
      this.biometricAuth();
    } else {
     // alert(`manuell: ${auto}`);
     this.requestservice.login(this.logindaten.benutzername, this.logindaten.passwort);
    }
  }

  biometricAuth() {
    //alert('BIO');
    Fingerprint.show({
      clientId: "Cordova BIO",
      clientSecret: "password"
      // this binding
    }, successCallback.bind(this), errorCallback.bind(this));

    function successCallback(result){
      alert(`successCallback: ${result}`);
      this.requestservice.login('Testuser', 'PW');
    }
  
     function errorCallback(err){
      alert(`errorCallback`);
      
    }
  }
  

}
