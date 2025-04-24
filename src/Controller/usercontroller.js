import user from "../model/UserModel.js";
import UserService from "../service/userService.js";

class userController {
    constructor () {
        this.userService = new UserService();
    }

    getAllUsers = async (req, res) => {
        try {
            const users = await this.userService.getAllUsers();
            if(!users){
                return res.status(404).json({ message: 'No users found' });
            }
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    getUserById = async (req, res) => {
        const { id } = req.params;
        try {
            const user = await this.userService.getUserById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    addUser = async (req, res) => {
        const User = req.body;
        try {
            const newUser = await this.userService.AddUser( User);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    updateUser = async (req, res) => {
        const  id  = req.params.id;
        const User = req.body;
        try {
            const updatedUser = await this.userService.UpdateUser(id, User);
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    deleteUser = async (req, res) => {
        const id  = req.params.id;
        try {
            const deletedUser = await this.userService.DeleteUser(id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default userController;