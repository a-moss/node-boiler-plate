<h1 align="center">Node + Express + TS Boiler Plate</h1>
<h4 align="center">Boiler plate Express.js + TypeScript project with auth and an ORM.</h4>

---
Whenever I started a new Express project, I found that I was recreating a lot of the same code. This project solves that problem
by providing a boiler plate with Express.js and TypeScript which provides a file structure, full authentication, .env support,
and sequelize ORM support out of the box.

#### Getting Started
1) Update the .env with per-project configurations. <br>:warning: Ensure the JWT_SECRET is updated and unique to your project.
2) Start the docker container: `npm run docker`<br>This docker container creates the database and starts the hot-reload development server.
If you want to just start the database and run the development server on your host machine, you can run `docker compose up sql_db -d` 
3) 💸💸

#### Wishlist of items ☑️:
1) Sequelize-typescript seeder generation (from the model files)
2) Stripe payments
3) CLI/scheduler for jobs
4) Unit tests
5) Cleaner code

---
## Directory structure
The directory structure is designed to allow for a logical decoupling of code. The `database` directory contains all database
migrations and seeders (powered with sequelize). The `config` directory contains all application config values that are not
env variables (for example, the default mailing address).

The `app` directory contains all the source code for the application. See this hierarchy for a brief description of 
what composes the directory.
```
src
  ↳ app
    ↳ Data // The Data directory most commonly stores constants and exported interfaces for use throughout the app
    ↳ Http // The Http directory stores all the logic that handles new API requests. 
        ↳ Controllers // The Controllers directory contains all the controllers for your routes (loosely following the MVC pattern)
        ↳ Middleware // The Middleware directory contains all the middleware applied to routes throughout the app
    ↳ Models // The Models directory contains all ORM models. With the default configuration, all the files in this directory should follow the naming schema of: MODELNAME.model.ts
    ↳ Routes // The Rotues directory is where you define new routes, their controllers, and their validators. With the default configuration, all the files in this directory should follow the naming schema of: ROUTESNAME.routes.ts
    ↳ Services // The Services directoy contains any services/providers used throughout the app
    ↳ Transformers // The Transformers directory contains all transformers that are used to transform Models into JSON responses
