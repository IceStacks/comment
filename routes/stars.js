const express = require('express')
const router = express.Router({mergeParams: true})
const { body } = require('express-validator');
const {index, store, update, destroy} = require('./../controllers/StarController')

router.get('/', index)

// TODO : value değeri 1 ile 10 arasında olmalı.

router.post('/',
    body('user_id').not().isEmpty().trim().escape().isNumeric().isLength({ min: 0, max: 100000000000 }),
    body('value').not().isEmpty().trim().escape(),
    store)

router.put(
    '/:id',
    body('user_id').not().isEmpty().trim().escape().isNumeric().isLength({ min: 0, max: 100000000000 }),
    body('value').not().isEmpty().trim().escape(),
    update)

router.delete('/:id', destroy)

module.exports = router
