import { Component, OnInit, HostBinding } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
declare var device;

const THEME_DARKNESS_SUFFIX = `-dark`

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  @HostBinding('class') activeThemeCssClass: string
    isThemeDark = false
    activeTheme: string
    deviceready: boolean
    darklight: string = 'hi'
    

    constructor(private overlayContainer: OverlayContainer) {
      // Set default theme here:
      this.setActiveTheme('deeppurple-amber', /* darkness: */ false)
  }

  ngOnInit() {
    
    // code in loginkomponente verschoben
    document.addEventListener("deviceready", () => {
      this.deviceready = true;
      window.cordova.plugins.osTheme.getTheme()
        .then(theme => { // { isDark: [boolean] }     
          theme.isDark ? this.toggleDarkness() : alert('light');
         // alert('The current theme is: ' + (theme.isDark ? 'Dark' : 'Light'))
        })
        .catch(message => { // string error message
          alert('Error getting theme: ' + message)
        })
      //alert(device.platform);
      
    }, false);
  }

  setActiveTheme(theme: string, darkness: boolean = null) {
    if (darkness === null)
        darkness = this.isThemeDark
    else if (this.isThemeDark === darkness) {
        if (this.activeTheme === theme) return
    } else
        this.isThemeDark = darkness

    this.activeTheme = theme

    const cssClass = darkness === true ? theme + THEME_DARKNESS_SUFFIX : theme
    darkness ? this.darklight = 'Dark' : this.darklight = 'Light';

    const classList = this.overlayContainer.getContainerElement().classList
    if (classList.contains(this.activeThemeCssClass))
        classList.replace(this.activeThemeCssClass, cssClass)
    else
        classList.add(cssClass)

    this.activeThemeCssClass = cssClass
}

toggleDarkness() {
    this.setActiveTheme(this.activeTheme, !this.isThemeDark)

}

}
