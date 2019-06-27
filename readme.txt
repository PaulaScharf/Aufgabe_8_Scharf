Hilfreiche Werkzeuge ("putting it all together"). In dieser Übung wird ein Webserver für eine systematische Entwicklung vorbereitet.

Express-Webapp (5 Punkte):
- Kopiere das beigefügten Verzeichnis und bennene es um in <Aufgabe_08_name>
- Navigiere mit der CLI in das übergeordnete Verzeichnis.
- Generiere eine Express-Webapp mit dem Befehl $ express <Aufgabe_08_name>.
- Navigiere in das Projektverzeichnis mittels $ cd <Aufgabe_08_name>.
- Installiere die App-Abhängigkeiten mittels $ npm install

- Alternativ: Erstelle eine Webapp und kopiere dann die beigefügten Dateien in das Projektverzeichnis.

- Durch das Kopieren der beigefügten Dateien wurden hinzugefügt:
-> Ein Verzeichnis test.
-> Der Router items.js im Verzeichnis routes.
-> index.html und test.js im Verzeichnis public.
-> Dateien für Docker.
-> ein Codeschnipsel code-connect-db.js.

- Der Startpunkt der generierten App befindet sich in ./bin/www
- Die Programmierung startet in der Datei app.js. Hier müssen der Router eingebunden und eine Datenbankverbindung hergestellt werden.

- Erstelle ein Verzeichnis namens "data" für den Datenbankservice.
- Installiere den Mongodb-Treiber mittels $ npm install --save mongodb
- Kopiere den code zur Verbindung mit der Datenbank in die App ein (siehe Datei: code-connect-db.js).
- Kopiere auch die Middleware, die den Routern die Datenbankvebindung über das Request-Objekt zur Verfügung stellt (siehe Datei: code-connect-db.js).

- Der Items-Router stellt die üblichen CRUD-Funktionen zur Verfügung.
- Binde den Items-Router in app.js ein und passe die Routen ggf. so an, dass die CRUD-Funktionen über die spezifizierten URLs  (*) erreichbar sind.

(*) Spezifikation der URL-Routen als httpie-Befehle:
HTTP POST localhost:3000/item name=foo description=bar
HTTP GET localhost:3000/item?_id=<itemid>
HTTP PUT localhost:3000/item _id=<itemid> name=foo description=bar
HTTP DELETE localhost:3000/item _id=<itemid>

- Binde Morgan ein, so dass bei jeder HTTP-Anfrage eine Log-Nachricht ausgegeben wird.
- Erstelle einen Screenshot einer Log-Nachricht zu einem PUT Aufruf.

Manuelles Testen der Routen nach jeder Änderung wäre auf Dauer unpraktisch. Deswegen entwickeln wir als nächstes Unit-Tests für das Backend.

Unit-Testing mit QUnit und Mocha (5 Punkte):
- Die Tests stellen mit Hilfe von AJAX-Aufrufen (qUnit) und http-Requests (Mocha) sicher, dass die CRUD-Routen korrekt funktionieren.

- Installiere Mocha mittels: $ npm install --save mocha
- Die Mocha-Tests sollen mit dem Befehl $ npm test gestartet werden können.

- Installiere QUnit mittels: $ npm install --save jquery qunit
- Erstelle die Routen für die installierten Client-Bibliotheken:
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/qunit', express.static(__dirname + '/node_modules/qunit/qunit'));
- Ersetze die eingebetteten cdn-Versionen durch die eigenen installationen.
- Die URL http://localhost:3000 öffnet die QUnit-Seite im Browser.

- Einer der Tests muss noch implementiert werden.
- Alle Test-Cases müssen erfolgreich durchlaufen.
- Erstelle Screenshots von den erfolgreichen Tests und gebe diese mit ab.

Die Entwickelte Webapp wird demnächst durch ein Frontend-Team genutzt. Der zugehörige Business-Prozess soll in Zukunft automatisiert werden. Deswegen erstellen wir vorsorglich ein Docker-Image und legen es in DockerHub ab.

Docker und DockerHub (5 Punkte):
- Erstelle ein DockerHub-Konto (wenn noch nicht vorhanden).
- Da der Webserver in einem Docker-Container laufen soll, muss als erstes die Datenbankverbindung angepasst werden (siehe code-connect-db.js).
- Beim erstellen des images sollte das data-Verzeichnis leer sein.
- Um den Container zu starten mit dem data-Verzeichnis als volume zu starten, muss das data-Verzeichnis (oder ein übergeordnetes Verzeichnis) in der Docker GUI freigegeben werden.
- Erstelle ein Docker-Image mit Hilfe des beigefügten Dockerfile und lade es in die DockerHub-Registry.
- Ändere die docker-compose.yml so, dass das Image aus DockerHub kommt und nicht mehr lokal erstellt werden muss.
- Die benötigten Docker-Befehle finden sich in den Vorlesungsunterlagen (Termin 10.pdf).
- Die benötigte Befehlsfolge für den Nutzer-Account "cheesedocks" könnte dann zum Beispiel so aussehen:
$ docker build -t "cheesedocks/aufgabe-08-cheese" .
$ docker login
$ docker push "cheesedocks/aufgabe-08-cheese"

- Das Image wird dann in einem neuen Respository auf DockerHub gespeichert und sollte im Account auffindbar sein.
- Um die Umgebung aus den Images in der DockerHub-Registry zu starten:
 $ docker-compose up

Weitere Materialien (mit Anleitung):
https://github.com/streuselcake/jslab/tree/master/webserver-docker/mongodb-containers
https://github.com/streuselcake/jslab/blob/master/webserver-docker/mongodb-containers/index.js
https://nodejs.org/de/docs/guides/nodejs-docker-webapp/

- Die Mocha-Tests funktionieren auch außerhalb des Containers.
- Die QUnit-Tests sind weiter über http://localhost:3000 erreichbar.

Git und GitHub (5 Punkte):
- Erstelle ein GitHub-Konto (wenn noch nicht vorhanden).
- Erstelle ein Repository auf GitHub, clone es lokal und commite und pushe das in dieser Übung erstellte Projekt.
- Achte auf sinnvolle .gitignore-Einträge. Committe und pushe das .gitignore-File.
- Committe und Pushe ein readme.md.
- Die benötigten Git-Befehle finden sich in den Vorlesungsunterlagen (Termin 10.pdf).

Bonus (+2):
- Erstelle ein Fork des Repositories jslab.
- Erstelle einen Pull-Request, der die in dieser Übung erstellte Anwendung hinzufügt. Alternativ kann eine bel. Änderung oder ein neues Beispiel vorgeschlagen werden.
- Erstelle einen Pull-Request-Kommentar (begründe zum Beispiel, warum die angefragte Änderung in die Beispielsammlung aufgenommen werden sollte).

Hinweise:
- In dieser Übung wird kein Frontend entwickelt.
- Nenne die Links zu den Git- und DockerHub-Repositories in der Abgabe (z.B. in einer readme.md)!
- Die URL-Routen können mit den Developer-Tools oder einem HTTP-Tool aufgerufen werden.
