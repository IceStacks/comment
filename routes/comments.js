const express = require('express')
const router = express.Router()
const Comment = require('../models/Comment')
const { body, validationResult } = require('express-validator');

router.get('/', async function (req, res) {
    let response = null
    await Comment
         .findAndCountAll({offset: 3, limit: 3})
        .then(result => {
            return res.status(200).json(result)
        }).catch(error => {
            return res.status(500).json(error)
        })
})

router.get('/:id', async function (req, res) {
    const id = req.params.id

    const comment = await Comment.findByPk(id).catch(error => {
        return res.status(500).json(id + ' numaralı kayıt veritabanından alınamadı. Error : ' + JSON.stringify(error))
    });

    if (comment === null) {
        return res.status(404).send("Bulunamadı !")
    } else {
        if(comment instanceof Comment){
            return res.status(200).send(comment)
        }else {
            return res.status(500).send("Bilinmeyen bir hata oluştu.")
        }
    }
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
        return res.status(201).send('Kayıt başarıyla tamamlandı.')
    }).catch(error => {
        return res.status(500).send('Kayıt başarısız oldu. Error : ' + JSON.stringify(error))
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
    if (comment === null) {
        return res.status(404).send("Bulunamadı !")
    } else {
        if(comment instanceof Comment){
            return res.status(200).send(comment)
        }else {
            return res.status(500).send("Bilinmeyen bir hata oluştu.")
        }
    }

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
        return res.status(204).send('Kayıt başarıyla güncellendi.')
    }).catch(error => {
        return res.status(500).send('Güncelleme başarısız oldu. Error : ' + JSON.stringify(error))
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
            return res.status(200).send(id + ' numaralı kayıt başarıyla silindi.')
        }else{
            return res.status(200).send(id + ' numaralı kayıt bulunamadığı için silinemedi.')
        }
    }).catch(error => {
        return res.status(500).send(id + ' numaralı kayıt silinemedi. Error : ' + JSON.stringify(error))
    })

})

module.exports = router
