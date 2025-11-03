const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require("../config/conexion.js");

const JWT_SECRET = process.env.JWT_SECRET;

// Registro de usuario
exports.register = (req, res) => {
  let { username, password } = req.body;
  username = username.trim();
  if (!username || username.includes(' ')) {
    return res.status(400).json({ error: 'El nombre de usuario no puede estar vacío ni contener espacios' });
  }
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: 'Error al hashear contraseña' });
    }
    const sql = "INSERT INTO users (username, password_hash) VALUES (?, ?)";
    db.query(sql, [username, hashedPassword], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error al registrar usuario' });
      } else {
        res.status(201).json({ message: 'Usuario registrado' });
      }
    });
  });
};

// Login
exports.login = (req, res) => {
  const { username, password } = req.body;

  // Usuario de prueba local
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ id: 1, username: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al iniciar sesión' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }
    const user = results[0];
    bcrypt.compare(password, user.password_hash, (err, isValid) => {
      if (err) {
        return res.status(500).json({ error: 'Error al verificar contraseña' });
      }
      if (!isValid) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
};

// Update password
exports.updatePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const sqlSelect = "SELECT * FROM users WHERE username = ?";
  db.query(sqlSelect, [req.user.username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al buscar usuario' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const user = results[0];
    bcrypt.compare(oldPassword, user.password_hash, (err, isValid) => {
      if (err) {
        return res.status(500).json({ error: 'Error al verificar contraseña antigua' });
      }
      if (!isValid) {
        return res.status(401).json({ error: 'Contraseña antigua incorrecta' });
      }
      bcrypt.hash(newPassword, 10, (err, hashedNewPassword) => {
        if (err) {
          return res.status(500).json({ error: 'Error al hashear nueva contraseña' });
        }
        const sqlUpdate = "UPDATE users SET password_hash = ?, fecha_modificacion = CURRENT_TIMESTAMP WHERE username = ?";
        db.query(sqlUpdate, [hashedNewPassword, req.user.username], (err, result) => {
          if (err) {
            return res.status(500).json({ error: 'Error al actualizar contraseña' });
          }
          res.json({ message: 'Contraseña actualizada' });
        });
      });
    });
  });
};

// Get users
exports.getUsers = (req, res) => {
  const sql = "SELECT id_user, username, fecha_creacion, fecha_modificacion FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
    res.json({ users: results });
  });
};
