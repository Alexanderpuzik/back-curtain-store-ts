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
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      // Проверяем наличие ключа 'img' и извлекаем его
      const imgFiles = files['img'];
      if (!imgFiles || imgFiles.length === 0) {
        throw new Error('Image file is required');
      }

      const img = imgFiles[0]; // Берем первый файл из массива

      // Генерируем уникальное имя файла
      let fileName = `${uuidv4()}.jpg`;
      // Перемещаем полученный файл в директорию 'static'
      img.mv(path.resolve(__dirname, '..', 'static', fileName), err => {
        if (err) {
          throw new Error('File upload failed');
        }
      });

      // Создаем новую запись Curtain
      const curtain = await Curtain.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      // Обрабатываем дополнительную информацию о занавеске
      if (info) {
        try {
          const parsedInfo = JSON.parse(info);
          for (const i of parsedInfo) {
            await CurtainInfo.create({
              title: i.title,
              description: i.description,
              curtainId: curtain.id,
            });
          }
        } catch (error) {
          throw new Error('Invalid JSON format for info');
        }
      }

      return res.json(curtain);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    let { brandId, typeId } = req.query;
    let page: number = parseInt(req.query.page as string) || 1;
    let limit: number = parseInt(req.query.limit as string) || 9;
    let offset = (page - 1) * limit;

    // Делаем запрос в базу данных на основе условий фильтрации
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

    // Запрос одной занавески с дополнительной информацией
    const curtain = await Curtain.findOne({
      where: { id },
      include: [{ model: CurtainInfo, as: 'info' }],
    });

    if (!curtain) {
      return res.status(404).json({ message: 'Curtain not found' });
    }

    return res.json(curtain);
  }
}

export default new CurtainController();
