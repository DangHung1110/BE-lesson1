import { Router as ExpressRouter } from "express";
import userController from "../Controller/usercontroller.js";
import UserValidator from "../middleware/middleware.js";
import upload from "../middleware/multer.js";

class AppRouter {
  constructor() {
    this.router = ExpressRouter();
    this.userController = new userController();
    this.userValidator = new UserValidator();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get("/users", this.userController.getAllUsers); // get all users
    this.router.get("/users/:id", this.userController.getUserById); // get user by id
    this.router.post("/users", this.userValidator.checkUserValidate, this.userController.addUser); // add user
    this.router.put("/users/:id", this.userValidator.checkUserValidate, this.userController.updateUser); // update user
    this.router.delete("/users/:id", this.userController.deleteUser); // delete user
    this.router.post('/upload', upload.single('image'), this.userController.uploadImage); // upload image
  }
}

export default AppRouter;
