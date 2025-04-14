export const validateUser = (req, res, next) => {
    const { name, email, gender, age, phone } = req.body;

    if (!name || !email || !gender || !age || !phone) {
        return res.status(400).json({ message: "Missing required fields!" });
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format!" });
    }

    if (gender !== "male" && gender !== "female") {
        return res.status(400).json({ message: "Gender must be 'male' or 'female'!" });
    }

    if (!Number.isInteger(age) || age <= 0 || age >= 100) {
        return res.status(400).json({ message: "Age must be an integer between 1 and 99!" });
    }

    if (name.length < 10) {
        return res.status(400).json({ message: "Full name must be at least 10 characters long!" });
    }

    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: "Invalid phone number format!" });
    }

    next();
};
