# English

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

GOOGLE_ID= Your ID
GOOGLE_SECRET= Your Secret
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

# Deutsch

## Installation

Um die benötigten Node.js-Module zu installieren, führen Sie aus:

```bash
npm installieren
## oder
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

GOOGLE_ID= Your ID
GOOGLE_SECRET= Your Secret
```

## Mehr erfahren

Um mehr über Next.js zu erfahren, werfen Sie einen Blick auf die folgenden Ressourcen:

- [Next.js Dokumentation](https://nextjs.org/docs) - erfahren Sie mehr über Next.js Funktionen und API.
- [Learn Next.js](https://nextjs.org/learn) - ein interaktives Next.js Tutorial.

Sie können sich das [Next.js GitHub Repository](https://github.com/vercel/next.js/) ansehen - Ihr Feedback und Ihre Beiträge sind willkommen!
