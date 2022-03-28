const connectionString = require('../utils/db')
const Comment = require('../models/Comment');
const express = require('express')
const router = express.Router()
const { faker } = require('@faker-js/faker');

router.get('/', async function (req, res) {
    const url = req.protocol + '://' + req.get('host') + req.originalUrl;

    const migration = `<a href="${url + '/migrate?approve=true'}">buraya</a>`
    const seed = `<a href="${url + '/seed?approve=true'}">buraya</a>`
    const faker = `<a href="${url + '/faker'}">buraya</a>`

    const message =
        `Migration işlemini başlatmak için ${migration} tıklayınız.<br/>` +
        `Seed işlemini başlatmak için ${seed} tıklayınız.<br />` +
        `Faker ile rasgele veri oluşturma işlemini tetiklemek için ${faker} tıklayınız.`

    return res.send(message)
})

router.get('/migrate', async function (req, res) {
    if(req.query.approve === 'true'){
        await connectionString.sync()
        return res.send("Tablolar oluşturuldu...")
    }

    const url = req.protocol + '://' + req.get('host') + req.originalUrl + '?approve=true';
    const link = `<a href="${url}">buraya</a>`

    return res.send(`Migration çalıştırılmadı. Çalıştırmak için ${link} tıklayınız.`)
})

router.get('/seed', async function (req, res) {
    const data_1 = await Comment.create({
        user_id: 1,
        product_id: 1,
        text: 'ürünü çok beğendim',
    });
    const data_2 = await Comment.create({
        user_id: 2,
        product_id: 1,
        text: 'ben beğenmedim',
    });
    console.log(data_1.toJSON());
    console.log(data_2.toJSON());

    return res.send("2 tane kayıt oluşturuldu..")
})

router.get('/faker', async function(req, res){
    const random = faker.datatype.number({min: 100, max: 500})

    for (let i = 1; i <= random; i++){
        await Comment.create({
            user_id: faker.datatype.number({ min: 1, max: 100}),
            product_id: faker.datatype.number({ min: 1, max: 1000}),
            text: faker.lorem.sentence()
        });
    }

    return res.send(random + " kayıt oluşturuldu.")
});

module.exports = router
