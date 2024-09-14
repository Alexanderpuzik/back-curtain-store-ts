const uuid = require("uuid");
const path = require("path");
const { Curtain, CurtainInfo } = require("../models/models");
const ApiError = require("../error/ApiError");

class CurtainController {
  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      const curtain = await Curtain.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          CurtainInfo.create({
            title: i.title,
            description: i.description,
            curtainId: curtain.id,
          })
        );
      }

      return res.json(curtain);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let curtains;
    if (!brandId && !typeId) {
      curtains = await Curtain.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      curtains = await Curtain.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      curtains = await Curtain.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      curtains = await Curtain.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
      });
    }
    return res.json(curtains);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const curtain = await Curtain.findOne({
      where: { id },
      include: [{ model: CurtainInfo, as: "info" }],
    });
    return res.json(curtain);
  }
}

module.exports = new CurtainController();
