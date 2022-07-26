import { Router } from "express";
import QueryController from "../controllers/QueryController";
import Authorize from "../middleware/Authorize";

const router = Router();

router.get("/queries", Authorize.check, QueryController.index);

router.post("/query/save", Authorize.check, QueryController.save);

router.post("/query/del", Authorize.check, QueryController.delete);

router.post("/answers", Authorize.check, QueryController.indexAnswer);

router.post("/answer/save", Authorize.check, QueryController.saveAnswer);

export default router;
