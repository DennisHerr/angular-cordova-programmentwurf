import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
declare var NativeStorage;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public pushBenachrichtigung: {
    title: string;
    body: string;
    date: Date;
    type: string;
  }

  deviceid: string;

  constructor(private router: Router, private http: HttpClient) { 
    this.pushBenachrichtigung = {
      title: "",
      body: "",
      date: null,
      type: ""
    };
  }

  ngOnInit() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    //alert('ngOnInit');
    //this.onDeviceReady.bind(this);
  }

  onDeviceReady() {
    //alert('oneDeviceReady');
    this.pushBenachrichtigungInit();
    this.getDeviceID.bind(this);
  
  }

  pushBenachrichtigungInit() {
    console.log(window.plugins.OneSignal);
    
    window.plugins.OneSignal
    .startInit("b8e94a13-edce-4c4c-aec2-67211825c0b3")
    .handleNotificationOpened(function(openResult) {
      alert("Notification opened:\n" + JSON.stringify(openResult));
      //console.log('Notification opened: ' + JSON.stringify(openResult));   
  })
    .endInit();
      this.getDeviceID();
  }
  abmelden() {
    NativeStorage.clear();
    this.router.navigate(['..']);
  }

 getDeviceID() {
   alert('getDeviceID');
   window.plugins.OneSignal.getIds(function(ids) {
    NativeStorage.setItem('device_id', ids.userId);
   });
   NativeStorage.getItem('device_id', (key) => this.deviceid = key);
/*
   NativeStorage.getItem('device_id', function (key) {
     if (key == 'undefined') {
     window.plugins.OneSignal.getIds(function(ids) {
       NativeStorage.setItem('device_id', ids.userId);
      });
    } else {
      this.deviceid = key;
    }
   });
   alert('getDeviceID Ende');*/
  }

   postNotification() {
    if (this.pushBenachrichtigung.type == 'onesignal') {
      var body = {
        app_id: 'b8e94a13-edce-4c4c-aec2-67211825c0b3',
        include_player_ids: [this.deviceid],
        contents: {
          en: `${this.pushBenachrichtigung.body}`,
          de: `${this.pushBenachrichtigung.body}`
        },
        headings: {
          en: `One Signal: ${this.pushBenachrichtigung.title}`,
          de: `One Signal: ${this.pushBenachrichtigung.title}`
        },
        send_after: new Date(this.pushBenachrichtigung.date)
      };
      this.http.post('https://onesignal.com/api/v1/notifications', body).subscribe(data => {
        console.log(data);
      } , error => {
        console.log(error);
      });
     } else if (this.pushBenachrichtigung.type == 'lokal'){
      window.cordova.plugins.notification.local.schedule({
        title: `Lokale Benachrichtigung: ${this.pushBenachrichtigung.title}`,
        text: `${this.pushBenachrichtigung.body}`,
        foreground: true,
        trigger: { at: new Date(this.pushBenachrichtigung.date) }
    });
    }
  } 

}
