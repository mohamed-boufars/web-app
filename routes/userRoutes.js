import express from "express";
import { userController,deleteUserController,userCountController} from "./../controllers/userController.js";

const router = express.Router();


router.get("/get-user", userController);
router.delete("/delete-user/:email", deleteUserController);
router.get("/user-count", userCountController);

export default router;