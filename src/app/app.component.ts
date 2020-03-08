import { Component, OnInit } from '@angular/core';
declare var device;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-cordova-programmentwurf';

  ngOnInit() {
    // code in loginkomponente verschoben
    document.addEventListener("deviceready", function () {
      this.deviceready = true;
      window.cordova.plugins.osTheme.getTheme()
        .then(theme => { // { isDark: [boolean] }
          alert('The current theme is: ' + (theme.isDark ? 'Dark' : 'Light'))
        })
        .catch(message => { // string error message
          alert('Error getting theme: ' + message)
        })
      //alert(device.platform);
      
    }, false);
  }

}
