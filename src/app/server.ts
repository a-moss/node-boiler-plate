import * as express from 'express';
import { Sequelize } from 'sequelize-typescript';
import { validationResult } from 'express-validator';
import { basename, join, parse } from 'path';
import * as dotenv from 'dotenv';
import * as glob from 'glob';
import { CustomRoute, RouteHandler, Routes } from './Data/routes.data';
import './environment';
import { AppConfig } from '../config/app';

dotenv.config();

const app = express();
app.use(express.json());

// eslint-disable-next-line @typescript-eslint/naming-convention
const _ = new Sequelize({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  models: [`${__dirname}/app/Models`],
  modelMatch: (filename, member) => filename.substring(0, filename.indexOf('.model')) === member.toLowerCase(),
});

/**
 * This function is only used in bootstrapping the app. It adds each CustomRoute definition to express and applies
 * the appropriate middleware
 *
 * @param routes
 * @param middleware
 * @param prefix
 */
function addRouteGroup(
  routes: CustomRoute[], middleware: RouteHandler[], prefix: string = '',
) {
  routes.forEach((route: CustomRoute): void => {
    /* eslint-disable @typescript-eslint/dot-notation */
    // @ts-ignore
    app[route.method](
      `${prefix}${route.path}`, ...route.validator, ...middleware, (
          req: express.Request, res: express.Response, next: express.NextFunction,
      ): void => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.status(400).send({
            status: 400,
            errors: errors.array(),
          });
        } else {
          route.action(
            req, res, next,
          );
        }
      },
    );
  });
}

/**
 * This function loops through all files in the Routes folder and dynamically loads their routes
 *
 * @param globalRoutePrefix
 */
function loadRoutes(globalRoutePrefix: string = '') {
  glob.sync(`${__dirname}${AppConfig.routes.locationGlob}`).map((file: string) => {
    // Returns file path without extension
    const parsedFile = parse(file);
    return join(parsedFile.dir, parsedFile.name);
  })
    .forEach((fullPath: string) => {
      // eslint-disable-next-line import/no-dynamic-require
      const module = require(fullPath);
      const fileName = basename(fullPath);

      if (!module.default) {
        throw new Error(`No default export defined for route file "${fileName}"`);
      }

      if (!(module.default instanceof Routes)) {
        throw new Error(`Default export defined for route file "${fileName}" is not an instance of Routes`);
      }

      const routes = module.default as Routes;

      addRouteGroup(
        routes.routeDefinitions, routes.middleware, globalRoutePrefix + routes.routePrefix,
      );
    });
}

loadRoutes(AppConfig.routes.globalPrefix);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send({
    status: 200,
    message: `${process.env.APP_NAME} is okay.`,
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`The application is listening on port ${process.env.APP_PORT}`);
});
