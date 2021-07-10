import React, {useState, useEffect, useRef} from 'react'
import style from './productdetails.module.css'
import {jas} from '../../../assets/index'
import { AiOutlineLock, AiOutlineUnlock, AiOutlineDelete } from "react-icons/ai";
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import Aos from 'aos';
import 'aos/dist/aos.css';

function ProductDetails() {
  const history = useHistory()
  const params = useParams()
  const [btnUpdate, setBtnUpdate] = useState('enable')
  const [dataProduct, setGetDataProduct] = useState([])
  const imageRef = useRef(null)

  const [formUpdateProduct, setFormUpdateProduct] = useState({
    productName: dataProduct.productName,
    purchasePrice: dataProduct.purchasePrice,
    salePrice: dataProduct.salePrice,
    image: dataProduct.image,
    stock: dataProduct.stock
  })  

  const handleFormUpdate = (e) =>{
    setFormUpdateProduct({
      ...formUpdateProduct,
      [e.target.name]: e.target.value
    })
  }
  
  const handleChangeImage =(e) => {
    setFormUpdateProduct({
      ...formUpdateProduct,
      image: e.target.files[0]
    })
  }
  
  const idProduct = params.id
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API}/product/${idProduct}`)
    .then((res)=>{
      const data = res.data.data[0]
      setGetDataProduct(data)
    })
    .catch((err)=>{
      console.log(err);
    })

    Aos.init({duration: 3000})
  }, [])


  const handleSave = (e) =>{
    e.preventDefault()
    const formData = new FormData()

    formData.append('productName', formUpdateProduct.productName)
    formData.append('purchasePrice', formUpdateProduct.purchasePrice)
    formData.append('salePrice', formUpdateProduct.salePrice)
    formData.append('image', formUpdateProduct.image)
    formData.append('stock', formUpdateProduct.stock)
    imageRef.current.value = ""

    if(formUpdateProduct.image=='' || formUpdateProduct.image==null){
      swal('You must upload the image !')
    } else if (formUpdateProduct.productName==null || formUpdateProduct.productName==''){
      swal('Insert Product Name !')
    } else if (formUpdateProduct.purchasePrice==null || formUpdateProduct.purchasePrice==''){
      swal('Insert Purchase Price !')
    } else if (formUpdateProduct.salePrice==null || formUpdateProduct.salePrice==''){
      swal('Insert Sale Price !')
    } else if (formUpdateProduct.stock==null || formUpdateProduct.stock==''){
      swal('Insert Stock !')
    } else{
      axios.put(`${process.env.REACT_APP_API}/product/updateproduct/${idProduct}`, formData)
      .then((res) => {
        console.log(res.data, 'updataea image');
         if(res.data.message === "Succes update product"){
          setFormUpdateProduct(formUpdateProduct)
          swal(`Success Update Product !`)
          history.push(`/product`)
         } else if(res.data.message=== 'File too large'){
           swal('File too large. FIle Max 2 mb!')
         } else if(res.data.message==="Your type file is incorect !\n.jpeg, .png, .jpg only."){
           swal ("Your Type File is not Support. jpeg, jpg, png only !")
         } else{
           swal(res.data.error.message)
         }
       })
       .catch((err) => {
           console.log(err);
       }) 
    }
  }

  const handleUpdate = ()=>{
    setBtnUpdate('')
  }

  const handleDelete = () =>{
    let txt;

    let r = window.confirm("Are You Sure Want to Delete This Product ?")
    if(r == true){
      axios.delete(`${process.env.REACT_APP_API}/product/deleteproduct/${idProduct}`)
      .then((res) => {
        console.log(res.data)
        if(res.data.message === 'Succes delete data'){
          swal('Succes delete data')
          history.push('/product')
        }
      })
      .catch((err) => {
          console.log(err);
      }) 
      
    } else {
      txt = "You pressed Cancel!";
    }
  }

  return (
    <div className={[["jumbotron"], ["jumbotron-fluid"], style["product-detail-bg"]].join(' ')}>
      <div data-aos="fade-left" className="container">
        <p className={style["naviage-teks"]}>Home &gt; All Product &gt; Product Details</p>
        <div className="row mb-4">
          <div className="col">
            <h4 className="productdetail-title mb-4">Products Details</h4>
          </div>
          <div className="col-2">
            <p className={style["teks"]}>Enable Update</p>
          </div>
          <div className="col-5">
            {btnUpdate=='enable'?
              <button className={style['btn-update']} onClick={handleUpdate}><AiOutlineLock className={style["icon-update"]}/></button>
            :
              <button className={style['btn-update']} onClick={handleUpdate}><AiOutlineUnlock className={style["icon-update"]}/></button>
            }
          </div>
          <div className="col-1">
              <button onClick={handleDelete} className={style['btn-delete']}>
                <AiOutlineDelete className={style["icon-update"]}/>
              </button>
          </div>
        </div>
        <form action="">
        <div className="row">
          <div className="col">
            <img className={style['image-prod']} src={dataProduct.image} alt="" />
            <input type="file" 
                className={[style['form-img'], ['mt-3']].join(' ')} 
                name="image"
                id="image"
                title="Choose Photo"
                disabled={btnUpdate}
                ref={imageRef}
                onChange={e => handleChangeImage(e)}
              />
          </div>
          <div className="col">
            <p className={style["title"]}>Product Name</p>
            <input 
              className={[ style["form-style"], ["outline-noone"], ['mb-3']].join(' ')} 
              type="text" 
              name="productName"
              id="productName"
              disabled={btnUpdate}
              placeholder={dataProduct.productName}
              value={formUpdateProduct.productName}
              onChange={e=>handleFormUpdate(e)}
            />
            <br />
             <p className={style["title"]}>Stock</p>
            <input 
              className={[ style["form-style"], ["outline-noone"], ['mb-3']].join(' ')} 
              type="number" 
              name="stock"
              id="stock"
              disabled={btnUpdate}
              placeholder={dataProduct.stock}
              value={formUpdateProduct.stock}
              onChange={e=>handleFormUpdate(e)}
            />
          </div>
          <div className="col">
          <p className={style["title"]}>Sale Price</p>
            <input 
              className={[ style["form-style"], ["outline-noone"], ['mb-3']].join(' ')} 
              type="number" 
              name="salePrice"
              id="salePrice"
              disabled={btnUpdate}
              placeholder={dataProduct.salePrice}
              value={formUpdateProduct.salePrice}
              onChange={e=>handleFormUpdate(e)}
            />
            <br />
            <p className={style["title"]}>Purchase Price</p>
            <input 
              className={[ style["form-style"], ["outline-noone"], ['mb-3']].join(' ')} 
              type="number" 
              name="purchasePrice"
              id="purchasePrice"
              disabled={btnUpdate}
              placeholder={dataProduct.purchasePrice}
              value={formUpdateProduct.purchasePrice}
              onChange={e=>handleFormUpdate(e)}
            />
          </div>
        </div>
        </form>
        <div className="row">
          <div className="col-10 mt-4">
            <p className={style["notes"]}>***Notes :  Sale Price, Stock, and Purchase Price must be number !</p>
          </div>
          <div className="col">
            {btnUpdate=='enable'?
              null
            :
            <button type="button" onClick={handleSave} className={style['btn-save']}>Save </button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
