import User from "../model/UserModel.js";

class UserValidator {
  checkUserValidate = async (req, res, next) => {
    const user = req.body;
    const id = req.params.id || "";

    if (!user.name) {
      return res.status(400).json({ status: false, message: "Name is required" });
    }
    if (user.name.trim().length < 10) {
      return res.status(400).json({ status: false, message: "Name must be at least 10 characters" });
    }

    if (!user.email) {
      return res.status(400).json({ status: false, message: "Email is required" });
    }
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email);
    if (!isEmailValid) {
      return res.status(400).json({ status: false, message: "Email is invalid" });
    }

    const emailFilter = id ? { email: user.email, _id: { $ne: id } } : { email: user.email };
    const emailExists = await User.findOne(emailFilter);
    if (emailExists) {
      return res.status(400).json({ status: false, message: "Email already exists" });
    }

    if (user.age === undefined || user.age === null) {
      return res.status(400).json({ status: false, message: "Age is required" });
    }

    const parsedAge = parseInt(user.age, 10);
    if (isNaN(parsedAge) || parsedAge <= 0 || parsedAge > 100) {
      return res.status(400).json({ status: false, message: "Age is invalid" });
    }

    next();
  };
}

export default UserValidator;
