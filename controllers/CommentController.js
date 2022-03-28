const Comment = require("../models/Comment");
const {validationResult} = require("express-validator");

async function index (req, res) {
    await Comment
        .findAndCountAll({offset: 0, limit: 5})
        .then(result => {
            return res.status(200).json(result)
        }).catch(error => {
            return res.status(500).json(error)
        })
}

async function show(req, res) {
    const id = req.params.id

    const comment = await Comment.findByPk(id).catch(error => {
        // TODO : Hata olduğu gibi gösterilmemeli !
        return res.status(500).json(id + ' numaralı kayıt veritabanından alınamadı. Error : ' + JSON.stringify(error))
    });

    if (comment === null) {
        return res.status(404).send("Bulunamadı !")
    } else {
        if(comment instanceof Comment){
            return res.status(200).send(comment)
        }else {
            // TODO : Teknik ekip için burada log yazılmalı.
            return res.status(500).send("Bilinmeyen bir hata oluştu.")
        }
    }
}

async function store(req, res){

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
        // TODO : Hesaplanması gereken işlemler burada tetiklenmeli.
        return res.status(201).send('Kayıt başarıyla tamamlandı.')
    }).catch(error => {
        return res.status(500).send('Kayıt başarısız oldu. Error : ' + JSON.stringify(error))
    })
}

async function edit(req, res){
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
            // TODO : Teknik ekip için burada log yazılmalı.
            return res.status(500).send("Bilinmeyen bir hata oluştu.")
        }
    }

}

async function update(req, res){
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
        // TODO : Hata olduğu gibi gösterilmemeli !
        return res.status(500).send('Güncelleme başarısız oldu. Error : ' + JSON.stringify(error))
    })
}

async function destroy(req, res){
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
        // TODO : Hata olduğu gibi gösterilmemeli !
        return res.status(500).send(id + ' numaralı kayıt silinemedi. Error : ' + JSON.stringify(error))
    })
}

module.exports = {
    index,
    show,
    store,
    edit,
    update,
    destroy,
}
