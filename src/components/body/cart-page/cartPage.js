import React, { useState, useEffect } from 'react'
import CartPageItem from './cartPageItem'
import callApi from '../../../common/callApi'
import './cartpage.css'
import MyPagination from '../../../common/pagination'
import { connect } from 'react-redux'
import { onDeleteProduct } from '../../../components/action/action'
import { onCheckout } from '../../../components/action/action'
import { Link } from 'react-router-dom'
import { formatNumberUSD } from '../../../common/formatNumber'
import {db} from '../../../firebase'

function CartPage (props) {
  const [dataCart, setDataCart] = useState([])
  const [subTotal, setSubTotal] = useState(0)
  const [total, setTotal] = useState(0)
  const [checkoutData, setCheckoutData] = useState('')

  const _limit = 6
  const [currentPage, setCurrentPage] = useState(1)
  const [indexDataRender, setIndexDataRender] = useState(0)

  const fetchData = async () => {
    let subTotals = 0
    let totals = []
    let data = []
    await db.collection("cart")
        .get()
        .then(snapshot => snapshot.docs.map(doc => {
          data.push({...doc.data(), id: doc.id})
        }))
        if (data.length>0) {
          let total = data.map(item => item.total)
          totals.push(total)
          console.log('totals', totals)
          subTotals = totals[0].reduce((a,b) => a+b,0)

          setDataCart([...data])
        } else {
          totals = []
          subTotals = 0
          setDataCart([])
        }
        setSubTotal(subTotals)
  }

  useEffect(() => {
    fetchData()
    return () => {
      setDataCart([])
    }
  }, [])

  const onPlusQty = props => {
    console.log('props', props)
    let total = props.qty * props.price
    let subTotals = subTotal + props.price;
    setSubTotal(subTotals)
    setTotal(total)
  }

  const onMinusQty = props => {
    console.log('props', props)
    let total = props.qty * props.price
    let subTotals = subTotal - props.price;
    setSubTotal(subTotals)
    setTotal(total)
  }

  const onDeleteProduct = id => {
    if (id) {
      let index = dataCart.findIndex(item => item.id === id)
      let newDataCart = [...dataCart]
      newDataCart.splice(index, 1)
      setDataCart(newDataCart)
      if (pagination().length <= 1) {
        console.log('test pagination length')
        setCurrentPage(currentPage - 1)
        setIndexDataRender(currentPage - 1)
      }
      props.handleDeleteProduct(index)
      fetchData()
    }
  }

  const addToCheckout = (arr) => {
    return arr.forEach(item => {
      db.collection("data-checkout").add({...item, status: paid})
      setCheckoutData({...item})
      // callApi(`data-checkout`, 'post', {...item, status: 'paid'})
      
      // .then(setCheckoutData(item))
      // (callApi(`cart`, 'delete', null))
    })
  }

  const onCheckout = () => {
    if (dataCart.length > 0) {
      let data = [];
      db.collection("cart")
        .get()
        .then(snapshot => snapshot.docs.map(doc => {
          data.push({...doc.data(), id: doc.id})

          if(data.length>0) {
            if(window.confirm('You want to pay?')) {
              let new_dataCart = [...res.data]
              let new_data = []
              new_dataCart.forEach(item => new_data.push({...item, status: 'paid'}))
              addToCheckout(new_dataCart)
              props.handleCheckout([...new_data])
            }
          }
        }))

      // callApi(`cart`, 'get', null).then(res => {
      //   if (res && res.data.length > 0) {
      //     if (window.confirm('You want to pay?')) {
      //       let new_dataCart = [...res.data]
      //       let new_data = []
      //       new_dataCart.forEach(item => new_data.push({...item, status: 'paid'}))
      //       addToCheckout(new_dataCart)
      //       // new_dataCart.forEach(async item => aw 
      //       props.handleCheckout([...new_data])
      //       props.history.push('/checkout')
      //     }
      //   } else addToCheckout([])
      // })
    }
  }

  useEffect(() => {
    callApi(`cart`, 'get', null).then(res => {
      if (res && res.data.length > 0) {
        let dataCart = [...res.data]
        console.log('dataCart', dataCart)
        setDataCart([...res.data])
      } else setDataCart([])
    })

    return () => {setDataCart([])}
  }, [checkoutData])

  const nextPage = number => {
    setIndexDataRender(number * _limit)
    setCurrentPage(currentPage + 1)
  }
  const prePage = number => {
    setIndexDataRender((number - 2) * _limit)
    setCurrentPage(currentPage - 1)
  }

  const pagination = () => {
    let newData = []
    if (dataCart.length <= 0) return
    let end =
      indexDataRender + _limit >= dataCart.length
        ? dataCart.length
        : indexDataRender + _limit

    if (dataCart.length === 1) return dataCart
    for (let i = indexDataRender; i < end; i++) {
      newData.unshift(dataCart[i])
    }
    return newData
  }

  return dataCart.length > 0 ? (
    <div className='container-fluid'>
      <div className='container'>
        <div className='row mt-3'>
          <div className='col-12 mt-5'>
            <div className='card text-center'>
              <h5
                className='card-header bg-danger text-light'
                style={{
                  fontSize: '2rem',
                  fontWeight: '600',
                  textShadow: '4px 2px 8px rgba(0,0,0,0.6)'
                }}
              >
                <i className='fa fa-shopping-cart'></i> Your Cart
              </h5>
              <div className='card-body'>
                <table className='table table-bordered table-striped'>
                  <thead>
                    <tr className='bg-light'>
                      <th>Num</th>
                      <th>Image</th>
                      <th>Name Product</th>
                      <th>New Price</th>
                      <th>Old Price</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Paid?</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagination() &&
                      pagination().map((data, i) => {
                        return (
                          <CartPageItem
                            data={data}
                            key={i}
                            index={i}
                            onMinusQty={onMinusQty}
                            onPlusQty={onPlusQty}
                            onDeleteProduct={onDeleteProduct}
                          />
                        )
                      })}
                  </tbody>
                </table>
                <div className='sub-total d-flex justify-content-end'>
                  <h3
                    className='text-uppercase mr-4'
                    style={{
                      fontWeight: '600',
                      textShadow: '4px 4px 38px rgba(0,0,0,0.6)'
                    }}
                  >
                    Subtotal:
                  </h3>
                  <h4
                    className='text-danger'
                    style={{ fontWeight: '600', fontSize: '2.5rem' }}
                  >
                    {formatNumberUSD(subTotal)}
                  </h4>
                </div>
                <div className='checkout d-flex justify-content-end mt-2'>
                  <button
                    type='button'
                    className='checkout-btn'
                    onClick={() => onCheckout()}
                  >
                    Checkout
                  </button>
                </div>
                <div className='container mt-5'>
                  <MyPagination
                    nextPage={nextPage}
                    prePage={prePage}
                    data={dataCart}
                    _limit={_limit}
                    currentPage={currentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        <div
          className='order float-right'
          style={{ fontSize: '1.2rem', fontWeight: '600', color: '#7685f7' }}
        >
          <Link to='/checkout' className='order-btn ml-2'>
            Your Order <i className='fas fa-arrow-right'></i>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className='text-center mt-4 nothing-cart'>
      <h2>Nothing in the cart</h2>
      <Link to='/'>
        <button className='btn btn-success'>Shop Now</button>
      </Link>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    handleDeleteProduct: id => dispatch(onDeleteProduct(id)),
    handleCheckout: pay => dispatch(onCheckout(pay))
  }
}

export default connect(null, mapDispatchToProps)(CartPage)
