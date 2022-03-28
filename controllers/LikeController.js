const Like = require("../models/Like");
const {validationResult} = require("express-validator");

async function index (req, res) {
    const comment_id = req.params.comment_id

    await Like
        .findAndCountAll({
            offset: 0,
            limit: 5,
            where: {
                comment_id:comment_id
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

    const user_id = req.body.user_id
    const comment_id = req.params.comment_id

    await Like.create({
        user_id: user_id,
        comment_id: comment_id,
    }).then(result => {
        // TODO : Hesaplanması gereken işlemler burada tetiklenmeli.
        return res.status(201).send('Kayıt başarıyla tamamlandı.')
    }).catch(error => {
        return res.status(500).send('Kayıt başarısız oldu. Error : ' + JSON.stringify(error))
    })
}

async function destroy(req, res){
    const id = req.params.id

    await Like.destroy({
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
    destroy,
}
