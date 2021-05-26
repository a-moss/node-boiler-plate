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
