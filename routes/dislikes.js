const express = require('express')
const router = express.Router({mergeParams: true})
const { body } = require('express-validator');
const {index, store, destroy} = require('./../controllers/DislikeController')

router.get('/', index)

router.post('/',
    body('user_id').not().isEmpty().trim().escape().isNumeric().isLength({ min: 0, max: 100000000000 }),
    body('comment_id').not().isEmpty().trim().escape().isNumeric().isLength({ min: 0, max: 100000000000 }),
    store)

router.delete('/:id', destroy)

module.exports = router
