import React from 'react'
import logo from "../../assets/Logo-Nutech.png"
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <div className="d-flex"> </div>
          <Link className="navbar-brand" to="/"><img src={logo} width="200" height="86" alt="logo" /></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav ml-auto pt-3 pb-3">
              <li className="nav-item">
                <Link className="nav-link" to="/newproduct">New Product</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
