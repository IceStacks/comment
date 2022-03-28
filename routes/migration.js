const connectionString = require('../utils/db')
const Comment = require('../models/Comment');
const express = require('express')
const router = express.Router()
const { faker } = require('@faker-js/faker');
const {index, migrate, seed, fakerMethod} = require('../controllers/MigrationController')

router.get('/', index)

router.get('/migrate', migrate)

router.get('/seed', seed)

router.get('/faker', fakerMethod);

module.exports = router
