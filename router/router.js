import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const dbPath = path.join(process.cwd(), "db.json");

// Hàm đọc dữ liệu từ db.json
const ReadDB = () => {
    const data = fs.readFileSync(dbPath, "utf8");
    return JSON.parse(data);
};

// Hàm ghi dữ liệu vào db.json
const WriteDB = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf8");
};

//  GET tất cả users
router.get('/users', (req, res) => {
    const users = ReadDB().users;
    res.status(200).json(users);
});

//  GET user theo ID
router.get('/users/:id', (req, res) => {
    const users = ReadDB().users;
    const user = users.find(u => u.id == parseInt(req.params.id));

    if (!user) {
        return res.status(404).json({ message: "ID not found!" });
    }

    res.status(200).json(user);
});

// POST newUser
router.post('/users', (req, res) => {
    const { name, gender, age } = req.body;

    if (!name || !age || !gender) {
        return res.status(400).json({ message: "Chưa nhập đủ thông tin!" });
    }

    const db = ReadDB();
    const newUser = {
        id: db.users.length ? db.users[db.users.length - 1].id + 1 : 1,
        name,
        age,
        gender
    };

    db.users.push(newUser);
    WriteDB(db);

    res.status(201).json({ message: "Successfully!", user: newUser });
});

//PUT theo id
router.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, gender, age } = req.body;

    if (!name || !age || !gender) {
        return res.status(400).json({ message: "Cần phải gửi đầy đủ thông tin (name, gender, age)!" });
    }

    let db = ReadDB();

    const userIndex = db.users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found!" });
    }

    db.users[userIndex] = {
        id: userId,
        name,
        gender,
        age
    };

    WriteDB(db);

    res.json({ message: "successfully!", user: db.users[userIndex] });
});

// PUT theo id
router.patch('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, gender, age } = req.body;

    if (!name && !age && !gender) {
        return res.status(400).json({ message: "Chưa nhập đủ thông tin!" });
    }

    let db = ReadDB();
    const userIndex = db.users.findIndex(u => u.id == userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    if (name) db.users[userIndex].name = name;
    if (gender) db.users[userIndex].gender = gender;
    if (age) db.users[userIndex].age = age;

    WriteDB(db);

    res.json({ message: "Successfully!", user: db.users[userIndex] });
});

router.delete('/users/:id', (req, res) => {
    const userID = parseInt(req.params.id);
    let db = ReadDB();
    const userIndex = db.users.findIndex(u => u.id == userID);

    db.users.splice(userID - 1 , 1);

    WriteDB(db)
    res.json({ message: "User deleted successfully!" });
})

export default router;
