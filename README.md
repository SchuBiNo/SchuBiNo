This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installation

To install the required Node.js Modules run:

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

This app will sync userdata with a MongoDB Database.

To connect to your database you have to provide a MongodDB Enpoint URI in your `.env` file as follows:

```bash
MONGO_URI='mongodb+srv://username:password@endpoint'
```

Replace `username`, `password` and `endpoint` with your MongoDB Database `username`, `password` and `endpoint`.

## Enabeling external Credentials Provider

To enable Google and GitHub as Credential Provider you have to add your API details in the `.env` file as follows:

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
