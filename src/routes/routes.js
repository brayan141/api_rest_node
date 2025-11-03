const express = require('express');
const router = express();

const authController = require('../controllers/auth.controller');
const { authenticateToken } = require('../middleware/jwt');

module.exports = () => {
    router.post('/auth/login', authController.login);
    router.post('/auth/register', authController.register);
    router.put('/auth/update-password', authenticateToken, authController.updatePassword);
    router.get('/auth/users', authenticateToken, authController.getUsers);

    return router;
}
