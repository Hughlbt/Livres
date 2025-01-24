const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const stuffCtrl = require('../controllers/stuff');

router.post('/', auth, stuffCtrl.addLivre);
router.put('/:id', auth, stuffCtrl.modifyLivre);
router.delete('/:id', auth, stuffCtrl.deleteLivre);
router.get('/:id', auth, stuffCtrl.getOneLivre);
router.get('/', auth, stuffCtrl.getAllLivres);


module.exports = router;