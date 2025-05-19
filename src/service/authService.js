import jwt from 'jsonwebtoken';
import User from '../model/UserModel.js';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { ErrorResponse, ConflictRequestError, BadRequestError, AuthFailureError, NotFoundError} from "../handler/error.reponse.js"

dotenv.config();

const SECRET_KEY = process.env.TOKEN_SECRET_KEY

class AuthService {
    hashPassword(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    async register({ name, age, email, password, hobbies }) {
        const exists = await User.findOne({ email });
        if (exists) {
            throw new ConflictRequestError("Email already exists!");
        }

        const hashed = this.hashPassword(password);
        const user = new User({ name, age, email, password: hashed, hobbies });
        await user.save();

        return { name: user.name, email: user.email, hobbies: user.hobbies };
    }

    async login(email, password) {
        const hashed = this.hashPassword(password);
        const user = await User.findOne({ email, password: hashed });
        if (!user) throw new BadRequestError("Invalid email or password!");

        const payload = { id: user._id, email: user.email };
        const accessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });

        return {
            accessToken,
            refreshToken,
            message: "Đăng nhập thành công"
        };
    }

    async refreshToken(oldRefreshToken) {
        return new Promise((resolve, reject) => {
            if (!oldRefreshToken) {
                return reject(new AuthFailureError('Refresh token not found'));
            } else {
                jwt.verify(oldRefreshToken, SECRET_KEY, (err, user) => {
                    if (err) {
                        return reject(new AuthFailureError('Invalid refresh token'));
                    }
                    console.log(user);
                    const payload = { id: user.id, email: user.email }; 
                    console.log(payload);
                    const newAccessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '15m' });

                    resolve({ accessToken: newAccessToken });
                });
            }
        })
    }


    async getUserById(userId) {
        const user = await User.findById(userId).select('-password');
        if( !user) {
            throw new NotFoundError('User not found');
        }
        return user;
    }
}

export default AuthService;
