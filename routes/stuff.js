const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bookCtrl = require('../controllers/book');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, bookCtrl.addBook);
router.put('/:id', auth, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.get('/:id', auth, bookCtrl.getOneBook);
router.get('/', auth, bookCtrl.getAllBooks);


module.exports = router;