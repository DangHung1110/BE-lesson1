import express from 'express';
import dotenv from 'dotenv';
import router from './router/router.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT;

// 🛠 Thêm middleware để Express hiểu JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello các bé nha!');
});

app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

         
//senmatic version   