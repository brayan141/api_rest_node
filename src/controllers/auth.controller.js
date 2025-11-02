const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require("../config/conexion.js");
const { authenticateToken } = require('../middleware/jwt.js');

const JWT_SECRET = process.env.JWT_SECRET;

// Registro de usuario
exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, hashedPassword]);
    res.status(201).json({ message: 'Usuario registrado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Usuario de prueba local
  if (username === 'admin' && password === '12345678') {
    const token = jwt.sign({ id: 1, username: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

    const user = rows[0];
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Update password
exports.updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE id_user = ?', [req.user.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

    const user = rows[0];
    const isValid = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isValid) return res.status(401).json({ error: 'Contraseña antigua incorrecta' });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await db.execute('UPDATE users SET password_hash = ?, fecha_modificacion = CURRENT_TIMESTAMP WHERE id_user = ?', [hashedNewPassword, req.user.id]);
    res.json({ message: 'Contraseña actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar contraseña' });
  }
};
