const express = require('express');
const router = express();

const bookController = require('../controllers/book.controller');
const authController = require('../controllers/auth.controller');

module.exports = () => {
    router.post('/auth/login', authController.login);
    router.post('/auth/register', authController.register);
    router.put('/auth/update-password', authController.updatePassword);
    router.get('/books', bookController.getBooks);
    router.get('/books/:id', bookController.getBookById);
    router.post('/books', bookController.createBook);
    router.put('/books/:id', bookController.updateBookById);
    router.delete('/books/:id', bookController.deleteBookById);
    router.get('/prueba', bookController.getPrueba);

    return router;
}
