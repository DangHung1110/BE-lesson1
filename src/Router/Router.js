import { Router } from "express";
import userController from "../Controller/usercontroller.js";

const router = Router();

router.get('/users', userController.getUsers);
router.get('/form/:id?', userController.getUserForm);
router.post('/save', userController.saveUser);
router.get('/delete/:id', userController.deleteUser);

export default router;
