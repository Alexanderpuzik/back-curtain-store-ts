import { Request, Response } from 'express';
import { Type } from '../models/models';
import ApiError from '../error/ApiError';

class TypeController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    try {
      const type = await Type.create({ name });
      return res.json(type);
    } catch (error) {
      return res.status(500).json(ApiError.internal('Unable to create type'));
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const types = await Type.findAll();
      return res.json(types);
    } catch (error) {
      return res.status(500).json(ApiError.internal('Unable to fetch types'));
    }
  }
}

export default new TypeController();
