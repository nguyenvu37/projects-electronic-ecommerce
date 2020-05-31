import React, { useState, useEffect } from 'react'
import Waitting from '../../../common/waiting'
import callApi from '../../../common/callApi'
import CheckoutItem from './checkoutItem'
import MyPagination from '../../../common/pagination'
import './checkout.css'
import {Link} from 'react-router-dom'

const CheckoutPage = props => {
  const [dataCart, setDataCart] = useState([])
  const [subTotal, setSubTotal] = useState(0)

  const _limit = 6
  const [currentPage, setCurrentPage] = useState(1)
  const [indexDataRender, setIndexDataRender] = useState(0)

  const fetchData = async () => {
    let subTotals = 0
    let totals = []
    await callApi(`cart?status=${'paid'}`, 'get', null).then(res => {
      if (res && res.data.length > 0) {
        const dataTotals = [...res.data]
        let id_dataCart = []
        dataTotals.filter(item => id_dataCart.push(item.id))
        let total = dataTotals.map(item => item.total)
        totals.push(total)
        subTotals = totals[0].reduce((a, b) => {
          return a + b
        }, 0)
        setDataCart([...res.data])
      } else {
        totals = []
        subTotals = 0
      }
      setSubTotal(subTotals)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

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
                <i className='fa fa-money-bill'></i> Your Bill
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
                    </tr>
                  </thead>
                  <tbody>
                    {pagination() &&
                      pagination().map((data, i) => {
                        return <CheckoutItem data={data} key={i} index={i} />
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
                    ${subTotal}
                  </h4>
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
            <Link to='/my-cart' className='order-btn ml-2'>
              <i className='fas fa-plus'></i> Your Cart
            </Link>
          </div>
        </div>
    </div>
  ) : (
    <Waitting custom={{ position: 'relative', top: '20px' }} />
  )
}

export default CheckoutPage