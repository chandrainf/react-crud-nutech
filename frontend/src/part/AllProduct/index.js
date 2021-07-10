import { useState, useEffect } from 'react'
import style from './allproduct.module.css'
import { jas } from '../../../assets/index'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Aos from 'aos';
import 'aos/dist/aos.css';


function AllProduct() {
  const history = useHistory()
  const [getProduct, setGetProduct] = useState([])
  const [page, setPage] = useState(1);
  const [by, setBy] = useState('productName');
  const [order, setOrder] = useState("ASC");
  const [title, setTitle] = useState({
    name: ''
  });


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/product?page=${page}&limit=4&by=${by}&order=${order}&productName=${title.name}`)
      .then((res) => {
        const dataProduct = res.data
        setGetProduct(dataProduct)
      })
      .catch((err) => {
        console.log(err);
      })

    Aos.init({ duration: 3000 })
  }, [page, order, title.name])

  const getMapProduct = getProduct.data
  const userPerPage = getProduct.MaxperPage
  const totalPage = getProduct.totalPage
  const nowPage = getProduct.currentPage
  const totalUsers = getProduct.totalUsers

  const handleFormSearch = (e) => {
    setTitle({
      ...title,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className={[["jumbotron"], ["jumbotron-fluid"], style["product-bg"]].join(' ')}>
      <div className="container">
        <p className={style["naviage-teks"]}>Home &gt; All Product</p>
        <div className="row mb-4">
          <div className="col">
            <h4 className="allproduct mb-4">All Products</h4>
          </div>
          <div className="col-4">
            <form className="form">
              <input
                data-aos="fade-left"
                className={[["form-control"], ["mr-sm-2"], style["form-search"]].join(' ')}
                type="search"
                placeholder="Search Product Name"
                name="name"
                id="name"
                value={title.name}
                onChange={(e) => handleFormSearch(e)}
              />
            </form>
          </div>
        </div>

        <div className="row">
          {getMapProduct !== undefined
            ? getMapProduct.map((item) => {
              return (
                <>
                  <div className="col-lg-3 col-6">
                    <div
                      data-aos="fade-up"
                      className={style["card"]}
                      onClick={() => { history.push(`/product/${item.id}`); }}
                    >
                      <img
                        className={[["card-img-top"], style["product-img"],].join(" ")}
                        src={item.image}
                        // src={`${process.env.REACT_APP_API_IMG}${item.image}`}
                        alt=""
                      />
                      <div className="card-body">
                        <p className={style["product-name"]}>{item.productName}</p>
                        <p className={style["salePrice"]}>Sale Price : {item.salePrice}</p>
                        <p className={style["purchasePrice"]}>Buying Price : {item.purchasePrice}</p>
                        <p className={style["teks-store"]}>Stock : {item.stock}</p>

                      </div>
                    </div>
                  </div>
                </>
              );
            })
            : console.log("try again")}
        </div>

        {/* AWAL BUTTON */}
        <div className="row display-flex justify-content-center mt-2">
          {Array.from(Array(totalPage).keys()).map(item =>
            <>
              <div className="col-lg-1 col-2 display-flex justify-content-center ">
                <button className={style['btn-pagination']} onClick={() => setPage(item + 1)} >{item + 1}</button>
              </div>
            </>
          )}
        </div>
        {/* Akhir button */}
      </div>
    </div>
  )
}

export default AllProduct
