const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bookCtrl = require('../controllers/book');
const multer = require('../middleware/multer-config');

router.delete('/deleteAll', bookCtrl.deleteAll);
router.get('/bestrating', bookCtrl.getBestRating);
router.post('/', auth, multer, bookCtrl.addBook);
router.post('/:id/rating', auth, bookCtrl.rateBook);
router.put('/:id', auth, multer, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.get('/:id', bookCtrl.getOneBook);
router.get('/', bookCtrl.getAllBooks);

module.exports = router;