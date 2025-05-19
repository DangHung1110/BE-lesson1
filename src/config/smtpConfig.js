import dotvn from 'dotenv';
import user from '../model/UserModel';
dotvn.config();

SMTP.config = { 
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
}
