import express from "express"
import dotenv from "dotenv"
import methodOverride from "method-override"
import AppRouter from './src/Router/Router.js';
import instanceMongoDB from "./src/config/dbConfig.js";

const PORT = process.env.PORT;
const app = express();
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }));
dotenv.config();
instanceMongoDB.connect();
const port = process.env.PORT;
const router = new AppRouter();
app.use('/', router.router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});