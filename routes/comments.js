const express = require('express')
const router = express.Router()
const Comment = require('../models/Comment')
const { body, validationResult } = require('express-validator');

router.get('/', async function (req, res) {
    let response = null
    await Comment
         .findAndCountAll({offset: 3, limit: 3})
        .then(result => {
            response = JSON.stringify(result)
        }).catch(error => {
            response = JSON.stringify(error)
        })

    return res.send(response)
})

router.get('/:id', async function (req, res) {
    const id = req.params.id

    const comment = await Comment.findByPk(id).catch(error => {
        console.log(JSON.stringify(error))
    });

    let message = ''
    if (comment === null) {
        message = "Bulunamadı !"
    } else {
        if(comment instanceof Comment){
            message = JSON.stringify(comment)
        }else {
            message = "Bilinmeyen bir hata oluştu."
        }
    }

    return res.send(message)
})

router.post('/',
    body('user_id').not().isEmpty().trim().escape().isNumeric().isLength({ min: 0, max: 100000000000 }),
    body('product_id').not().isEmpty().trim().escape().isNumeric().isLength({ min: 0, max: 100000000000 }),
    body('text').not().isEmpty().trim().escape(),
    async function (req, res){

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user_id = req.body.user_id
    const product_id = req.body.product_id
    const text = req.body.text

    await Comment.create({
        user_id: user_id,
        product_id: product_id,
        text: text
    }).then(result => {
        // TODO : 201 döndürülmeli
        return res.send('Kayıt başarıyla tamamlandı.')
    }).catch(error => {
        return res.send('Kayıt başarısız oldu. Error : ' + JSON.stringify(error))
    })
})

router.get('/:id/edit', async function (req, res){
    const id = req.params.id
    const comment = await Comment.findOne({
        where: {
            id: id
        },
        attributes: ['id','text']
    });
    let message = ''
    if (comment === null) {
        message = "Bulunamadı !"
    } else {
        if(comment instanceof Comment){
            message = JSON.stringify(comment)
        }else {
            message = "Bilinmeyen bir hata oluştu."
        }
    }

    return res.send(message)
})

router.put(
    '/:id',
    body('text').not().isEmpty().trim().escape().withMessage('BOŞ VERİ GÖNDERME !!!!'),
    async function (req, res){
    // TODO : beforeUpdate ile zaman güncellenmeli

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id
    const text = req.body.text

    await Comment.update( {
        text: text,
    }, {
        where: {
            id: id
        },
    }).then(result => {
        // TODO : 204 döndürülmeli
        return res.send('Kayıt başarıyla güncellendi.')
    }).catch(error => {
        return res.send('Güncelleme başarısız oldu. Error : ' + JSON.stringify(error))
    })
})

router.delete('/:id', async function (req, res){
    const id = req.params.id

    await Comment.destroy({
        where: {
            id: id
        },
    }).then(result => {
        if(result === 1){
            return res.send(id + ' numaralı kayıt başarıyla silindi.')
        }else{
            return res.send(id + ' numaralı kayıt bulunamadığı için silinemedi.')
        }
    }).catch(error => {
        return res.send(id + ' numaralı kayıt silinemedi. Error : ' + JSON.stringify(error))
    })

})

module.exports = router
