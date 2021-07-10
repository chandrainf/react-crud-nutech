const productModels = require('../models/products')

const helper = require('../helpers/helper')
const { v4: uuidv4 } = require('uuid');
const moment = require('moment')
moment.locale('id');

exports.getProduct = async(req, res) => {
  const by = req.query.by || 'id'
  const order = req.query.order || 'ASC'
  const searchProduct = req.query.productName || ''
  const limit = parseInt(req.query.limit) || 5
  const page = parseInt(req.query.page) || 1
  
  const countProducts = await productModels.countProducts()

  const totalData = countProducts[0].totalData
  const totalPage = Math.ceil(totalData / limit)
  const offset = (page - 1) * limit

  productModels.getProducts(searchProduct, offset, limit, by, order)
    .then((result) => {
      if (result.length > 0) {
        res.json({
          message: `Succes get data`,
          status: 200,
          currentPage: page,
          totalPage: totalPage,
          totalProducts: totalData,
          MaxperPage: limit,
          data: result
        })
      } else {
        res.json({
          message: 'No Data !',
          status: 500
        })
      }
    })
}

exports.getProductById = (req, res) => {
  const id = req.params.idproduct
  productModels.getProductsById(id)
    .then((result) => {
      if (result.length > 0) {
        res.json({
          message: `Succes get data id: ${id}`,
          status: 200,
          data: result
        })
      } else {
        res.json({
          message: 'Id not found !',
          status: 500
        })
      }
    })
}

exports.createProduct = async (req, res) => {
  try {
    if (!req.file) {
      const err = new Error('You must upload the image!')
      err.errorStatus = 200
      throw err
    }

    const { productName, purchasePrice, salePrice, 	image, 	stock } = req.body
    const result = await productModels.findProductName(productName)
    
    if (result.length !== 0) {
      return helper.response(res, null, 200, { message: 'Product Name Already Exists' })
    }
    const data = {
      productName,
      purchasePrice,
      salePrice,
      stock,
      image: `${process.env.API_BACKEND}/image/${req.file.filename}`,
    }
    const resultInsert = await productModels.createProducts(data)

    return helper.response(res, data, 200, null)
  } catch (error) {
    console.log(error)
    return helper.response(res, null, 500, { message: 'Internal Server Error' })
  }
}


exports.updateProduct = async(req, res) => {
  if (!req.file) {
    const err = new Error('You must upload the image!')
    err.errorStatus = 200
    throw err
  }

  const id = req.params.idproduct
  const { productName, purchasePrice, salePrice, 	image, 	stock } = req.body

  const result = await productModels.findProductName(productName)
    
    if (result.length !== 0) {
      return helper.response(res, null, 200, { message: 'Product Name Already Exists' })
    }
  
  const data = {
    productName,
    purchasePrice,
    salePrice,
    stock,
    image: `${process.env.API_BACKEND}/image/${req.file.filename}`,
  }
  productModels.updateProducts(data, id)
    .then((result) => {
      if (result.changedRows !== 0) {
        res.json({
          message: 'Succes update product',
          status: 200,
          data: data
        })
      } else {
        res.json({
          message: 'Id not found !',
          status: 500
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}


exports.deleteProduct = (req, res) => {
  const id = req.params.idproduct
  productModels.deleteProducts(id)
    .then((result) => {
      if (result.affectedRows !== 0) {
        res.json({
          message: `Succes delete data`,
          status: 200
        })
      } else {
        res.json({
          message: 'Id not found !',
          status: 500
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

  


