import express from 'express';

export function exampleMiddleware(
  req: express.Request, res: express.Response, next: express.NextFunction,
) : void {
  next();
}
