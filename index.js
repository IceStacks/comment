require('dotenv').config();
const express = require('express')
const app = express()
const commentRoutes = require('./routes/comments')
const migrationRoutes = require('./routes/migration')
const likeRoutes = require('./routes/likes')
const dislikeRoutes = require('./routes/dislikes')
const starRoutes = require('./routes/stars')
const bodyParser = require('body-parser')
const port = process.env.PORT || 8000

// TODO : Ortak response kalıbı oluşturulmalı ve JSON döndürmeli

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', function (req, res) {
    res.send("Anasayfa..")
})

app.use('/comments', commentRoutes)
app.use('/comments/:comment_id/likes', likeRoutes)
app.use('/comments/:comment_id/dislikes', dislikeRoutes)
app.use('/comments/:comment_id/stars', starRoutes)

app.use('/migration', migrationRoutes)

app.get('*', function (req, res) {
    res.send("Hata! Böyle bir rota bulunamadı.")
})

app.listen(port, function () {
    console.log("Sunucu başladı..")
})
