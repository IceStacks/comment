const Star = require("../models/Star");
const {validationResult} = require("express-validator");

async function index (req, res) {
    const comment_id = req.params.comment_id
    await Star
        .findAndCountAll({
            offset: 0,
            limit: 5,
            where: {
                comment_id : comment_id
            }
        })
        .then(result => {
            return res.status(200).json(result)
        }).catch(error => {
            return res.status(500).json(error)
        })
}

async function store(req, res){

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const comment_id = req.params.comment_id
    const user_id = req.body.user_id
    const value = req.body.value

    await Star.create({
        user_id: user_id,
        comment_id: comment_id,
        value: value
    }).then(result => {
        // TODO : Hesaplanması gereken işlemler burada tetiklenmeli.
        return res.status(201).send('Kayıt başarıyla tamamlandı.')
    }).catch(error => {
        return res.status(500).send('Kayıt başarısız oldu. Error : ' + JSON.stringify(error))
    })
}

async function update(req, res){
    // TODO : beforeUpdate ile zaman güncellenmeli

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const comment_id = req.params.comment_id
    const user_id = req.body.user_id
    const value = req.body.value

    const star = await Star.findOne({
        where: {
            comment_id: comment_id,
            user_id: user_id
        },
        attributes: ['id','value']
    });
    if (star === null) {
        return res.status(404).send("Bulunamadı !")
    } else {
        if(star instanceof Star){
            await star.update( {
                value: value,
            }).then(result => {
                return res.status(204).send('Kayıt başarıyla güncellendi.')
            }).catch(error => {
                // TODO : Hata olduğu gibi gösterilmemeli !
                return res.status(500).send('Güncelleme başarısız oldu. Error : ' + JSON.stringify(error))
            })
        }else {
            // TODO : Teknik ekip için burada log yazılmalı.
            return res.status(500).send("Bilinmeyen bir hata oluştu.")
        }
    }
}

async function destroy(req, res){
    const id = req.params.id

    await Star.destroy({
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
        // TODO : Hata olduğu gibi gösterilmemeli !
        return res.status(500).send(id + ' numaralı kayıt silinemedi. Error : ' + JSON.stringify(error))
    })
}

module.exports = {
    index,
    store,
    update,
    destroy,
}
