import express from 'express';
import { Model } from 'sequelize-typescript';

class StaticModel extends Model {}
export class Controller {
  async findOrFail(
      model: typeof StaticModel, key: string, value: string, res: express.Response, options?: any,
  ): Promise<Model | undefined> {
    try {
      const result = await model.findOne({
        where: {
          key: value,
        },
        ...options,
      });

      if (result) {
        return result;
      }
      res.send({ status: 404, message: 'Resource not found' });
    } catch (e) {
      res.send(e);
    }
    return undefined;
  }
}
