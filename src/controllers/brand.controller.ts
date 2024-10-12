import { Request, Response, NextFunction } from 'express';
import { Brand } from '../models/models';
import ApiError from '../error/ApiError';

class BrandController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { name } = req.body;
      if (!name) {
        return next(ApiError.badRequest('Name is required'));
      }
      const brand = await Brand.create({ name });
      return res.json(brand);
    } catch (error) {
      return next(
        ApiError.internal('Something went wrong while creating the brand')
      );
    }
  }

  async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const brands = await Brand.findAll();
      return res.json(brands);
    } catch (error) {
      return next(
        ApiError.internal('Something went wrong while fetching the brands')
      );
    }
  }

  async getOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      if (!id) {
        return next(ApiError.badRequest('ID is required'));
      }
      const brand = await Brand.findOne({ where: { id } });
      if (!brand) {
        return next(ApiError.notFound('Brand not found'));
      }
      return res.json(brand);
    } catch (error) {
      return next(
        ApiError.internal('Something went wrong while fetching the brand')
      );
    }
  }
}

export default new BrandController();
