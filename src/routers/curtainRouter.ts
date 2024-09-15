import Router from "express";
const router = new Router();
import curtainController from "../controllers/curtainController";
import checkRole from "../middleware/checkRoleMiddleware";

router.post("/", checkRole("ADMIN"), curtainController.create);
router.get("/", curtainController.getAll);
router.get("/:id", curtainController.getOne);

module.exports = router;
