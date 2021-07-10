const express = require('express')
const route = express.Router()

const routeProducts = require('./products');

route.use('/product', routeProducts)

module.exports = route
