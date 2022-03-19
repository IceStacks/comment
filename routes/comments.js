const express = require('express')
const router = express.Router()
const Comment = require('../models/Comment')

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

router.post('/', async function (req, res){
    // TODO : Doğrulama yapılarak veri kaydedilmeli

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

router.put('/:id', async function (req, res){
    // TODO : Doğrulama yaparak veri kaydedilmeli
    // TODO : beforeUpdate ile zaman güncellenmeli

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
