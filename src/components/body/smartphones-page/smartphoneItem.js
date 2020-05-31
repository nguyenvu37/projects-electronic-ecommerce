import React, { useState, useEffect } from 'react'
import callApi from '../../../common/callApi'
import { Link } from 'react-router-dom'
import Waitting from './../../../common/waiting'
import AddToCart from '../../../common/add-to-cart/addToCart'

const SmartphoneItem = props => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      await callApi(`products?category=smartphone`, 'get', null).then(res => {
        if (res) {
          if (res.data.length > 0) {
            setProducts([...res.data])
          }
        }
      })
    }
    fetchData()
  }, [])
  return (
    products.length > 0 ? (
      <div className='row'>
      {products.map((product, i) => {
        let oldPrice = product.oldPrice ? `$${product.oldPrice}` : ''
        let discount =
          product.discount === '' ? (
            ''
          ) : (
            <span className='sale'>{`-${product.discount}%`}</span>
          )
        return (
          <div className="col-4" key={i}>
          <div className='product'>
            <div className='product-img'>
              <img src={require(`./../../../img/${product.img}`)} alt='' />
              <div className='product-label'>{discount}</div>
            </div>
            <div className='product-body'>
              <p className='product-category'>Category</p>
              <h3 className='product-name'>
                <Link to={`/detail/${product.id}`}>{product.name}</Link>
              </h3>
              <h4 className='product-price'>
                ${product.newPrice}
                <del className='product-old-price ml-2'>{oldPrice}</del>
              </h4>
              <div className='product-rating'>
                <i className='fas fa-star' />
                <i className='fas fa-star' />
                <i className='fas fa-star' />
                <i className='fas fa-star' />
                <i className='fas fa-star' />
              </div>
              <div className='product-btns'>
                <button className='add-to-compare'>
                  <i className='fas fa-exchange-alt' />
                  <span className='tooltipp'>add to compare</span>
                </button>
                <button className='quick-view'>
                  <i className='fa fa-eye' />
                  <span className='tooltipp'>quick view</span>
                </button>
              </div>
            </div>
            <AddToCart id={product.id}/>
          </div>
          </div>
        )
      })}
    </div>
    ) : <Waitting custom={{ position: "relative", top: "-50px" }} />
  )
}

export default SmartphoneItem;