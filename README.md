# English

## Installation

To install the required Node.js Modules, run:

```bash
npm install
# or
yarn add
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/](http://localhost:3000/api/). These endpoints can be edited in `pages/api/`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Connecting to the Database

This app will sync user data with a MongoDB Database.

To connect to your database, you have to provide a MongoDB Endpoint URI in your `.env` file as follows:

```bash
MONGO_URI='mongodb+srv://username:password@endpoint'
```

Replace `username`, `password`, and `endpoint` with your MongoDB Database `username`, `password`, and `endpoint`.

## Enabling external Credentials Provider

To enable Google and GitHub as Credential Provider, you have to add your API details in the `.env` file as follows:

```bash
GITHUB_ID= Your ID
GITHUB_SECRET= Your Secret
GITHUB_SCOPE= "user:email"

GOOGLE_ID= Your ID
GOOGLE_SECRET= Your Secret
GOOGLE_SCOPE = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
```

## Connect to the Language API

The source code for the Language API can be found [here](https://github.com/SchuBiNo/SchuBiNo-langAPI).
Since the Language API is based on the Java Spring Framework, Apache Maven must be installed.
Then the API can be started with the following command:

```
mvn spring-boot:run
```

To connect the app to the API, the following values must be specified in the `.env` file:

```
LANGUAGE_API_URL = <URL>/api/v1/language
```

---

All repositories belonging to the project can be accessed on [GitHub](https://github.com/SchuBiNo).

<div style="page-break-after: always;"></div>

# Deutsch

## Installation

Um die benötigten Node.js-Module zu installieren, führen Sie aus:

```bash
npm install
# oder
yarn add
```

## Erste Schritte

Starten Sie zunächst den Entwicklungsserver:

```bash
npm run dev
# oder
yarn dev
```

Öffnen Sie [http://localhost:3000](http://localhost:3000) mit Ihrem Browser, um das Ergebnis zu sehen.

Auf [API-Routen](https://nextjs.org/docs/api-routes/introduction) kann über [http://localhost:3000/api/](http://localhost:3000/api/) zugegriffen werden. Diese Endpunkte können in `pages/api/` bearbeitet werden.

Das Verzeichnis `pages/api` wird auf `/api/*` abgebildet. Dateien in diesem Verzeichnis werden als [API-Routen](https://nextjs.org/docs/api-routes/introduction) anstelle von React-Seiten behandelt.

## Verbinden mit der Datenbank

Diese Anwendung synchronisiert Benutzerdaten mit einer MongoDB-Datenbank.

Um eine Verbindung zu Ihrer Datenbank herzustellen, müssen Sie eine MongoDB Endpoint URI in Ihrer `.env` Datei wie folgt angeben:

```bash
MONGO_URI='mongodb+srv://username:password@endpoint'
```

Ersetzen Sie `username`, `password` und `endpoint` durch Ihren MongoDB-Datenbank-Benutzernamen, Passwort und Endpunkt.

## Aktivieren externer Credentials Provider

Um Google und GitHub als Credentials Provider zu aktivieren, müssen Sie Ihre API-Details in der `.env` Datei wie folgt hinzufügen:

```bash
GITHUB_ID= Your ID
GITHUB_SECRET= Your Secret
GITHUB_SCOPE= "user:email"

GOOGLE_ID= Your ID
GOOGLE_SECRET= Your Secret
GOOGLE_SCOPE = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
```

## Verbinden mit der Language-API

Der Sourcecode für die Language-API ist [hier](https://github.com/SchuBiNo/SchuBiNo-langAPI) zu finden.
Da die Language-API auf dem Java Spring Framework basiert, muss Apache Maven installiert sein.
Dann kann die API mit dem folgenden Befehl gestartet werden:

```
mvn spring-boot:run
```

Um die App mit der API zu verbinden, müssen die folgenden Werte in der `.env` Datei angeben werden:

```
LANGUAGE_API_URL = <URL>/api/v1/language
```

---

Alle zum Projekt gehörenden Repositories können auf [GitHub](https://github.com/SchuBiNo) abgerufen werden.
