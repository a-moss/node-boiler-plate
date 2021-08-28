import { ValidationChain } from 'express-validator';
import express from 'express';

export type RouteHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => void;

export interface CustomRoute {
  path: any;
  method: string;
  action: RouteHandler;
  validator: ValidationChain[];
}

export abstract class Routes {
  abstract routeDefinitions: CustomRoute[];

  routePrefix: string = '';
  middleware: RouteHandler[] = [];
}
