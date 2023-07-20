import express from "express";
import { orderController} from "./../controllers/orderController.js";

const router = express.Router();


router.get("/get-order", orderController);


export default router;