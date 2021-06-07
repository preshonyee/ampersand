# Ampersand

Ampersand is an open-source web platform that provides a set of tools to help anyone in search of a new job. The app comprises of a job application tracker, resume builder and an analytics dashboard that analyzes data from every single application. It is built with React, TypeScript, NodeJS, and MongoDB.

## Backend API

Ampersand backend is a REST API service entirely built with TypeScript, NodeJS and MongoDB cloud database. It is hosted on [Render](https://render.com).

### Usage

`cd` into the `server` directory. Rename `.env.txt` to `.env` and update the values in it to your own

### Install Dependencies

```bash
cd server && npm install

# or
cd server && yarn install

```

### Run App

```bash
# Run in dev mode
cd server && npm run dev
# or
cd server && yarn dev

# Run in prod mode
cd server && npm run prod
# or
cd server && yarn prod
```

### Database Seeder

To seed the database with users, applications, resumes, radars and timeline activities with data from the "\_data" folder, run

```bash
# Destroy all data
node seeder -delete

# Import all data
node seeder -import
```

### Demo

The API is live at [ampersand-careers.render.com](https://ampersand-careers.onrender.com/api/v1)

Extensive documentation with examples and a Postman collection will be added soon

### Deploy on Render

The easiest way to deploy the backend REST API is to use [Render](https://render.com) alongside a MongoDB cloud database service like [Atlas](https://www.mongodb.com/cloud/atlas).

I'll add a note on how to deploy this later.

## Frontend App

The frontend application is a NextJS React app built entirely with NextJS, TypeScript, Redux Styled Components and Antd.

### Usage

`cd` into the `client` directory. Install all the required packages.

### Install Dependencies

```bash
cd client && npm install

# or
cd client && yarn install

```

### Run App

```bash
cd client && npm run dev
# or
cd client && yarn dev
```

### Demo

The full application is live at [ampersand.careers](https://ampersand.careers/)

### Deploy on Vercel or Netlify

The easiest way to deploy the frontend application is to use a static web hosting service like [Vercel](https://vercel.com) or [Netlify](https://netlify.app).

I'll add a note on how to deploy this later.

### License

The project is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).

- Version: 1.0.0
- License: MIT
- Author: PreshOnyee
