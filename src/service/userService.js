import user from '../model/UserModel.js';
import cloudinary from '../config/cloundinary.js';

class UserService {
    constructor() {
        this.ModelUser = user;
    }
    getAllUsers = async ()=> {
        try {
            const users = await this.ModelUser.find({});
            return users;
        }
        catch(error) {
            throw new Error('Error fetching users: ' + error.message);
        }
    }

    getUserById = async (id) => {
        try {
            const user = await this.ModelUser.findOne({ _id: id });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error('Error fetching user: ' + error.message);
        }
    }

    AddUser = async (user)=> {
        const data = new this.ModelUser({
            name: data.name,
            age: data.age,
            email: data.email,
            hobbies: data.hobbies
        })
        try {
            const newUser = await user.save();
            return newUser;
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    UpdateUser = async (id, user) => {
        const UserUpdated = await this.ModelUser.find({_id :id}) 
        if(UserUpdated) {
            await this.ModelUser.updateOne({_id : id}, {
                name: user.name,
                age: user.age,  
                email: user.email,
                hobbies: user.hobbies
            })
            return UserUpdated;
        }
        else {
            return null;
        }
    }

    DeleteUser = async (id) => {
        try {
            const user = await this.ModelUser.findOne({ _id: id });
            if (!user) {
                throw new Error('User not found');
            }
            await this.ModelUser.deleteOne({ _id: id });
            return user;
        }
        catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    }

    uploadtoCloudinary = async (filePath) => {
        try {
            const result = await cloudinary.uploader.upload(filePath, {
                folder: 'user',
                width: 500,
                height: 500,
                crop: 'scale'
            });
            return result;
        } catch (error) {
            throw new Error('Error uploading image to Cloudinary: ' + error.message);
        } 
    }
}

export default UserService;