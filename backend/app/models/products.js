const { query } = require('express')
const connection = require('../configs/db')

const product = {
  
  countProducts: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(*) AS totalData FROM products ', (err, result) => {
        if (err) {
          reject(new Error('Internal server error'))
        } else {
          resolve(result)
        }
      })
    })
  },


  getProducts: (productName, offset, limit, by, order) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM products WHERE productName LIKE '%${productName}%' ORDER BY ${by} ${order} LIMIT ${limit} OFFSET ${offset}`, (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
},

getProductsById: (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM products WHERE id = ${id}`, (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
},

findProductName: (productName) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM products WHERE productName = '${productName}'`, (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
},

createProducts: (data) => {
  return new Promise((resolve, reject) => {
    console.log(data.image)
    connection.query('INSERT INTO products SET ?', data, (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
},

updateProducts: (data, id) => {
  return new Promise((resolve, reject) => {
    connection.query(`UPDATE products SET productName ='${data.productName}' , purchasePrice=${data.purchasePrice}, salePrice=${data.salePrice}, image='${data.image}', stock=${data.stock} WHERE id=${id}`, (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
},

deleteProducts: (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM products WHERE id=?', id, (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(err)
      }
    })
  })
}



 


}
module.exports = product
