import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  }

   timeSet: EventEmitter<string>;

  constructor(private router: Router, private http: HttpClient) { 
    this.pushBenachrichtigung = {
      title: "",
      body: "",
      date: null
    };
  }

  ngOnInit() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    //alert('ngOnInit');
    //this.onDeviceReady.bind(this);
  }

  onDeviceReady() {
    //alert('oneDeviceReady');
    this.getDeviceID();
  
  }

  pushBenachrichtigungInit() {
    //alert('push');
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
    localStorage.clear();
    this.router.navigate(['..']);
  }

 getDeviceID() {
   if (localStorage.getItem('device_id') == null) {
     window.plugins.OneSignal.getIds(function(ids) {
       localStorage.setItem('device_id', ids.userId);
      });
    }
   }

   postNotification() {
    var body = {
      app_id: 'b8e94a13-edce-4c4c-aec2-67211825c0b3',  //ZTdhYmUzODItM2FhOC00ZDgyLTk2ZGMtOGFhNDIwN2Q1OTYw
      include_player_ids: [localStorage.getItem('device_id')],
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
   }

   postNotification2() {
    window.cordova.plugins.notification.local.schedule({
      title: `Lokale Benachrichtigung: ${this.pushBenachrichtigung.title}`,
      text: `${this.pushBenachrichtigung.body}`,
      foreground: true,
      trigger: { at: new Date(this.pushBenachrichtigung.date) }
  });

   }

}
