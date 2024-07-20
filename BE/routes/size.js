import { Router } from "express";
import { createSize, deleteSize, getAllSize, getSizeById, updateSize } from "../controllers/size.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const sizeRouter = Router()
sizeRouter.get("/" , getAllSize)
sizeRouter.post("/" , createSize)
sizeRouter.get("/:id" , getSizeById )
sizeRouter.put("/:id",checkPermission , updateSize)
sizeRouter.delete("/:id",checkPermission , deleteSize)

export default sizeRouter