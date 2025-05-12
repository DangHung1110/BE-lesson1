import { Router as ExpressRouter } from "express";
import AuthController from "../controller/authController.js";
import UserValidator from "../middleware/middleware.js"; 
import AuthMiddleware from "../middleware/checkAuth.js"; 

class AuthRouter {
  constructor() {
    this.router = ExpressRouter();
    this.authController = new AuthController();  
    this.authValidator = new UserValidator();   
    this.authMiddleware = new AuthMiddleware(); 
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.post("/auth/register", this.authValidator.checkUserValidate, this.authController.register);
    this.router.post("/auth/login", this.authController.login);
    this.router.post("/auth/refresh-token", this.authController.refreshToken); 
    this.router.post("/auth/logout", this.authController.logout);
    this.router.get("/auth/me", this.authMiddleware.checkAuth, this.authController.getCurrentUser);
  }
}

export default AuthRouter;