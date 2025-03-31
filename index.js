import express from 'express'
import dotenv from 'dotenv'

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.get('/',(req, res) => {
    res.send('Hello các bé nha!');
})

app.listen(PORT, ()=> {
    console.log(`sever is running on http://localhost:${PORT}`);
})
         
//senmatic version