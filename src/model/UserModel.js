import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        min: 0,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      hobbies: {
        type: Array,
      },
    },
    {
      timestamps: true, 
    }
)

const user = mongoose.model('user', UserSchema);
export default user;