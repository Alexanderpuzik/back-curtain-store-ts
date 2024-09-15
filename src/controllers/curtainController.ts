import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { Curtain, CurtainInfo } from '../models/models';
import ApiError from '../error/ApiError';

class CurtainController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files as {
        [fieldname: string]: Express.Multer.File[];
      }; // Adjust the type according to your file upload library

      if (!img) {
        throw new Error('Image file is required');
      }

      let fileName = uuidv4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName)); // Adjust according to actual function for moving files

      const curtain = await Curtain.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach(async (i: { title: string; description: string }) => {
          await CurtainInfo.create({
            title: i.title,
            description: i.description,
            curtainId: curtain.id,
          });
        });
      }

      return res.json(curtain);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    let { brandId, typeId, limit, page } = req.query;
    page = Number(page) || 1;
    limit = Number(limit) || 9;
    let offset = page * limit - limit;

    let curtains;
    if (!brandId && !typeId) {
      curtains = await Curtain.findAndCountAll({ limit, offset });
    } else if (brandId && !typeId) {
      curtains = await Curtain.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    } else if (!brandId && typeId) {
      curtains = await Curtain.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    } else if (brandId && typeId) {
      curtains = await Curtain.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
      });
    }
    return res.json(curtains);
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const curtain = await Curtain.findOne({
      where: { id },
      include: [{ model: CurtainInfo, as: 'info' }],
    });
    return res.json(curtain);
  }
}

export default new CurtainController();
