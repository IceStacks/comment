const express = require('express')
const router = express.Router()
const { body } = require('express-validator');
const {index, show, store, edit, update, destroy} = require('./../controllers/CommentController')

router.get('/', index)

router.get('/:id', show)

router.post('/',
    body('user_id').not().isEmpty().trim().escape().isNumeric().isLength({ min: 0, max: 100000000000 }),
    body('product_id').not().isEmpty().trim().escape().isNumeric().isLength({ min: 0, max: 100000000000 }),
    body('text').not().isEmpty().trim().escape(),
    store)

router.get('/:id/edit', edit)

router.put(
    '/:id',
    body('text').not().isEmpty().trim().escape().withMessage('BOŞ VERİ GÖNDERME !!!!'),
    update)

router.delete('/:id', destroy)

module.exports = router
