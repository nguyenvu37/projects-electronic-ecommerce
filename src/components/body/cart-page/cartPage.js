import React, { useState, useEffect } from 'react'
import CartPageItem from './cartPageItem'
import callApi from '../../../common/callApi'
import './cartpage.css'
import MyPagination from '../../../common/pagination'
import Waitting from '../../../common/waiting'
import { connect } from 'react-redux'
import { onDeleteProduct } from '../../../components/action/action'
import { onCheckout } from '../../../components/action/action'
import { Link } from 'react-router-dom'
import {formatNumberUSD} from '../../../common/formatNumber'

function CartPage (props) {
  const [dataCart, setDataCart] = useState([])
  const [subTotal, setSubTotal] = useState(0)
  const [total, setTotal] = useState(0)
  const [idDataCart, setIdDataCart] = useState([])
  const [new_data, setNew_data] = useState([])

  const _limit = 6
  const [currentPage, setCurrentPage] = useState(1)
  const [indexDataRender, setIndexDataRender] = useState(0)

  const funcSubTotal = total => {
    let subTotals = 0
    let totals = []
    if (total) {
      callApi(`cart`, 'get', null).then(res => {
        if (res && res.data.length > 0) {
          const dataTotal = [...res.data]
          let total = dataTotal.map(item => item.total)
          totals.push(total)
        } else totals = []
        console.log('totals', totals)
        subTotals = totals[0].reduce((a, b) => {
          return a + b
        }, 0)
        setSubTotal(subTotals)
      })
    } else return
  }

  const fetchData = async () => {
    let subTotals = 0
    let totals = []
    await callApi(`cart`, 'get', null).then(res => {
      if (res && res.data.length > 0) {
        const dataTotals = [...res.data]
        let id_dataCart = []
        let data = []
        dataTotals.filter(item => id_dataCart.push(item.id))
        let total = dataTotals.map(item => item.total)
        totals.push(total)
        subTotals = totals[0].reduce((a, b) => {
          return a + b
        }, 0)
        setIdDataCart([id_dataCart])
        dataTotals.filter(item => {
          if (item.status === 'unpaid') {
            data.push(item)
          }
          return data
        })
        console.log('data', data)
        setDataCart([...data])
      } else {
        totals = []
        subTotals = 0
        setIdDataCart([])
      }

      setSubTotal(subTotals)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    funcSubTotal(total)
  }, [total])

  const onPlusQty = props => {
    console.log('props', props)
    let total = props.qty * props.price
    setTotal(total)
  }

  const onMinusQty = props => {
    console.log('props', props)
    let total = props.qty * props.price
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

  const onCheckout = () => {
    callApi(`cart`, 'get', null).then(res => {
      if (res && res.data.length > 0) {
        let new_dataCart = [...res.data]
        let new_data = []
        let idArr = idDataCart[0]
        new_dataCart.filter(item => new_data.push({ ...item, status: 'paid' }))
        if (window.confirm('You want to pay?')) {
          for (let i = 0; i < idArr.length; i++) {
            callApi(`cart/${idArr[i]}`, 'put', new_data[i])
          }
          setNew_data([...new_data])
        }
        props.handleCheckout('checkout')
        props.history.push('/checkout')
      }
    })
  }

  useEffect(() => {
    setDataCart(new_data)
    return () => {}
  }, [new_data])

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
        <div className='order float-right' style={{ fontSize: '1.2rem', fontWeight: '600', color: '#7685f7' }}>
          <Link to='/checkout' className='order-btn ml-2'>
          <i className='fas fa-plus'></i>{' '}
          Your Order
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <Waitting custom={{ position: 'relative', top: '20px' }} />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    handleDeleteProduct: id => dispatch(onDeleteProduct(id)),
    handleCheckout: pay => dispatch(onCheckout(pay))
  }
}

export default connect(null, mapDispatchToProps)(CartPage)
