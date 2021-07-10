import React, { useState, useEffect, useRef } from 'react'
import style from './newproducts.module.css'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import { imageDefault } from '../../../assets/index'
import Aos from 'aos';
import 'aos/dist/aos.css';

function NewProducts() {
  const history = useHistory()
  const imageRef = useRef(null)

  const [formCreateProduct, setformCreateProduct] = useState({
    productName: '',
    purchasePrice: null,
    salePrice: null,
    image: '',
    stock: null
  })

  const handleFormCreate = (e) => {
    setformCreateProduct({
      ...formCreateProduct,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeImage = (e) => {
    setformCreateProduct({
      ...formCreateProduct,
      image: e.target.files[0]
    })
  }

  const handleCreate = (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append('productName', formCreateProduct.productName)
    formData.append('purchasePrice', formCreateProduct.purchasePrice)
    formData.append('salePrice', formCreateProduct.salePrice)
    formData.append('image', formCreateProduct.image)
    formData.append('stock', formCreateProduct.stock)
    imageRef.current.value = ""

    if (formCreateProduct.image == '' || formCreateProduct.image == null) {
      swal('You must upload the image !')
    } else if (formCreateProduct.productName == null || formCreateProduct.productName == '') {
      swal('Insert Product Name !')
    } else if (formCreateProduct.purchasePrice == null || formCreateProduct.purchasePrice == '') {
      swal('Insert Purchase Price !')
    } else if (formCreateProduct.salePrice == null || formCreateProduct.salePrice == '') {
      swal('Insert Sale Price !')
    } else if (formCreateProduct.stock == null || formCreateProduct.stock == '') {
      swal('Insert Stock !')
    } else {
      axios.post(`${process.env.REACT_APP_API}/product/createproduct`, formData)
        .then((res) => {
          console.log(res.data, 'Create');
          if (res.data.status === "Success" && res.data.data !== null) {
            setformCreateProduct(formCreateProduct)
            swal(`Success Create Product !`)
            history.push(`/product`)
          } else if (res.data.message === 'File too large') {
            swal('File too large. FIle Max 2 mb!')
          } else if (res.data.message === "Your type file is incorect !\n.jpeg, .png, .jpg only.") {
            swal("Your Type File is not Support. jpeg, jpg, png only !")
          } else {
            swal(res.data.error.message)
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  useEffect(() => {
    Aos.init({ duration: 3000 })
  }, [])

  return (
    <div className={[["jumbotron"], ["jumbotron-fluid"], style["product-detail-bg"]].join(' ')}>
      <div className="container">
        <p className={style["naviage-teks"]}>Home &gt; All Product &gt; Product Details</p>
        <div className="row mb-4">
          <div className="col">
            <h4 className="productdetail-title mb-4">Products Details</h4>
          </div>

        </div>
        <form action="">
          <div data-aos="fade-left" className="row">
            <div className="col">
              <img className={style['image-prod']} src={imageDefault} alt="" />
              <input type="file"
                className={[style['form-img'], ['mt-3']].join(' ')}
                name="image"
                id="image"
                title="Choose Photo"
                ref={imageRef}
                onChange={e => handleChangeImage(e)}
              />
            </div>
            <div className="col">
              <p className={style["title"]}>Product Name</p>
              <input
                className={[style["form-style"], ["outline-noone"], ['mb-3']].join(' ')}
                type="text"
                name="productName"
                id="productName"
                placeholder="Insert Product Name"
                value={formCreateProduct.productName}
                onChange={e => handleFormCreate(e)}
              />
              <br />
              <p className={style["title"]}>Stock</p>
              <input
                className={[style["form-style"], ["outline-noone"], ['mb-3']].join(' ')}
                type="number"
                name="stock"
                id="stock"
                placeholder="Insert Product's Stock"
                value={formCreateProduct.stock}
                onChange={e => handleFormCreate(e)}
              />
            </div>
            <div className="col">
              <p className={style["title"]}>Sale Price</p>
              <input
                className={[style["form-style"], ["outline-noone"], ['mb-3']].join(' ')}
                type="number"
                name="salePrice"
                id="salePrice"
                placeholder="Insert Sale Price"
                value={formCreateProduct.salePrice}
                onChange={e => handleFormCreate(e)}
              />
              <br />
              <p className={style["title"]}>Purchase Price</p>
              <input
                className={[style["form-style"], ["outline-noone"], ['mb-3']].join(' ')}
                type="number"
                name="purchasePrice"
                id="purchasePrice"
                placeholder="Insert Purchase Price"
                value={formCreateProduct.purchasePrice}
                onChange={e => handleFormCreate(e)}
              />
            </div>
          </div>
        </form>
        <div className="row" data-aos="fade-up">
          <div className="col-10 mt-3">
            <p className={style["notes"]}>***Notes :  Sale Price, Stock, and Purchase Price must be number !</p>
          </div>
          <div className="col">
            <button type="button" onClick={handleCreate} className={style['btn-save']}>Create Product </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewProducts
