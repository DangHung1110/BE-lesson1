import AuthService from '../service/authService.js';

const service = new AuthService();

class AuthController {
    async register(req, res) {
        try {
            const user = await service.register(req.body);
            res.status(201).json({ message: 'Registered successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const { accessToken, refreshToken } = await service.login(email, password);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true, // prevent client-side JS from accessing the cookie
                secure: process.env.NODE_ENV === 'production', // use secure cookies in production
                sameSite: 'strict', // prevent CSRF attacks
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.status(200).json({ message: 'Login successful', accessToken });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }

    async refreshToken(req, res) {
        try {
            const oldRefreshToken = req.cookies.refreshToken;

            const { accessToken } = await service.refreshToken(oldRefreshToken);

            res.status(200).json({
                message: 'Token refreshed successfully',
                accessToken
            });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }


    async logout(req, res) {
        try {
            service.logout();

            // Xóa cookie bằng cách đặt lại với maxAge = 0
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 0
            });

            res.status(200).json({ message: 'Đăng xuất thành công' });
        } catch (err) {
            res.status(500).json({ message: 'Đăng xuất thất bại' });
        }
    }

    async getCurrentUser(req, res) {
        try {
            const userId = req.user.id;
            const user = await service.getUserById(userId);

            if (!user) {
                return res.status(404).json({ message: 'Người dùng không tồn tại' });
            }

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi server', error: err.message });
        }
    }
}

export default AuthController;
