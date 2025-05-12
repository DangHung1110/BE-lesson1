import jwt from 'jsonwebtoken';
import User from '../model/UserModel.js';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.TOKEN_SECRET_KEY

class AuthService {
    hashPassword(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }

    async register({ name, age, email, password, hobbies }) {
        const exists = await User.findOne({ email });
        if (exists) {
            throw new Error('Email already exists');
        }

        const hashed = this.hashPassword(password);
        const user = new User({ name, age, email, password: hashed, hobbies });
        await user.save();

        return { name: user.name, email: user.email, hobbies: user.hobbies };
    }

    async login(email, password) {
        const hashed = this.hashPassword(password);
        const user = await User.findOne({ email, password: hashed });
        if (!user) throw new Error('Invalid credentials');

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
                return reject(new Error('No refresh token provided'));
            } else {
                jwt.verify(oldRefreshToken, SECRET_KEY, (err, user) => {
                    if (err) {
                        return reject(new Error('Invalid refresh token'));
                    }
                    const payload = { id: user._id, email: user.email };

                    const newAccessToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '3m' });
                    const newRefreshToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });

                    resolve({ accessToken: newAccessToken, refreshToken: newRefreshToken });
                });
            }
        })
    }

    logout() {
        return true;
    }

    async getUserById(userId) {
        const user = await User.findById(userId).select('-password');
        return user;
    }

}

export default AuthService;
