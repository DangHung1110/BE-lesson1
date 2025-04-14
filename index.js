import express from 'express';
import dotenv from 'dotenv';
import router from './src/Router/Router.js';
import path from 'path';    
import { fileURLToPath } from 'url';  // Thêm import này

const app = express();
dotenv.config();
const PORT = process.env.PORT;

// Thay vì sử dụng __dirname, sử dụng import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src', 'Views')); // Đường dẫn tới thư mục chứa view

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.redirect('/users')); 

app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
