import userModel from '../Models/UserModel.js';

class UserController {
  // Lấy danh sách user hiển thị dưới dạng HTML
  getUsers(req, res) {
    const users = userModel.getAll();
    res.render('index', { users }); // ✅ render ra giao diện pug
  }

  // Thêm người dùng mới
  postUser(req, res) {
    const { name, age, gender, email, phone } = req.body;
    if (!name || !age || !gender || !email || !phone) {
      return res.status(400).render('index', { users: userModel.getAll(), message: "Thông tin không đủ!" });
    }
    
    userModel.add({ name, age, gender, email, phone });
    const users = userModel.getAll();
    res.render('index', { users, message: "Đã thêm người dùng thành công!" });
  }

  // Xóa người dùng
  deleteUser(req, res) {
    const id = parseInt(req.params.id);
    const success = userModel.delete(id);
    const users = userModel.getAll();
    if (!success) {
      return res.status(404).render('index', { users, message: "Không tìm thấy người dùng để xoá!" });
    }
    res.render('index', { users, message: "Đã xoá người dùng thành công!" });
  }

  // Chỉnh sửa thông tin người dùng
  saveUser(req, res) {
    const { id, name, handle } = req.body;
    let message = "";
    if (id) {
      const updatedUser = userModel.update(id, { name, handle });
      if (!updatedUser) {
        return res.status(404).render('index', { users: userModel.getAll(), message: "Không tìm thấy người dùng!" });
      }
      message = "Đã cập nhật người dùng thành công!";
    } else {
      userModel.add({ name, handle });
      message = "Đã thêm người dùng mới thành công!";
    }
    const users = userModel.getAll();
    res.render('index', { users, message });
  }

  // Form chỉnh sửa người dùng
  getUserForm(req, res) {
    const id = req.params.id;
    if (id) {
      const user = userModel.getById(id);
      if (!user) return res.status(404).render('error', { message: "User not found!" });
      res.render('form', { user });
    } else {
      res.render('form', { user: null });
    }
  }
}

const userController = new UserController();
export default userController;
