import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'db.json');

class UserModel {
  _readDB() {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  }

  _writeDB(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
  }

  getAll() {
    return this._readDB().users;
  }

  getById(id) {
    return this.getAll().find(u => u.id === parseInt(id));
  }

  add(userData) {
    const db = this._readDB();
    const newUser = {
      id: db.users.length ? db.users[db.users.length - 1].id + 1 : 1,
      ...userData
    };
    db.users.push(newUser);
    this._writeDB(db);
    return newUser;
  }

  update(id, updatedData) {
    const db = this._readDB();
    const index = db.users.findIndex(u => u.id === parseInt(id));
    if (index === -1) return null;

    db.users[index] = { id: parseInt(id), ...updatedData };
    this._writeDB(db);
    return db.users[index];
  }

  delete(id) {
    const db = this._readDB();
    const index = db.users.findIndex(u => u.id === parseInt(id));
    if (index === -1) return false;

    db.users.splice(index, 1);
    this._writeDB(db);
    return true;
  }
}

const userModel = new UserModel();
export default userModel;
