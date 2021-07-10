const express = require('express')
const router = express.Router()
const productController = require('../controllers/products')
const { uploadMulter } = require('../middlewares/multer')

router
    .get('/', productController.getProduct)
    .get("/:idproduct", productController.getProductById)
    .post("/createproduct", uploadMulter.single('image'), productController.createProduct)
    .put("/updateproduct/:idproduct", uploadMulter.single('image'), productController.updateProduct)
    .delete("/deleteproduct/:idproduct", productController.deleteProduct)
    // .get("/receiver/:idreceiver", productController.getReceiver)
    // .get("/:id", productController.getTransactionById)
module.exports = router