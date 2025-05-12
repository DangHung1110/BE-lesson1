import express from "express"
import dotenv from "dotenv"
import methodOverride from "method-override"
import AppRouter from './src/Router/Router.js';
import instanceMongoDB from "./src/config/dbConfig.js";
import AuthRouter from "./src/Router/authRouter.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

// Middleware
app.use(express.json())
app.use(methodOverride('_method'))
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Kết nối database
instanceMongoDB.connect();

// Khởi tạo router
const router = new AppRouter();
const authRouter = new AuthRouter();

// Thiết lập routes
app.use('/', router.router);
app.use('/api/v1', authRouter.router);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});