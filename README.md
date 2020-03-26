# AngularCordovaProgrammentwurf

Im ersten Schritt muss in den Projektordner navigiert werden. Danach müssen die Pakete mit deren Abhängigkeiten installiert werden. Dabei ist zu beachten, dass dies sowohl für das Angular Projekt als auch für das Cordova Projekt erledigt werden muss. Um dies zu vereinfachen, wurde ein npm Befehl in der **package.json** definiert.

*npm run install-node-modules*

Dieser Befehl erledigt im Grunde folgendes.

*npm install && cd cordova && npm install -g cordova && npm install*

Zuletzt muss der **www** Ordner im cordova Projekt mit den Angular Webfiles angelegt werden.

*npm run build-to-www*

Anschließend ist es möglich in das Cordova Projekt zu navigieren und die einzelnen Varianten der App auszuführen.

Alternativ kann die entsprechende Variante der App direkt nach dem Erzeugen des **www** Ordners ausgeführt werden.

*npm run build-to-www-emulator-android*

*npm run build-to-www-emulator-ios*

*npm run build-to-www-device-android*

*npm run build-to-www-device-ios*

*npm run build-to-www-browser*

Das Projekt wurde aufgrund der Push Nachrichten Funktionalität in der fortgeschrittenen Entwicklung ausschließlich auf einem emulierten Android Gerät getestet.

Bei jeder Änderung des Angular Programmcodes, müssen die Webfiles im **www** Ordner erneut erzeugt werden.