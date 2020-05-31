import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import callApi from '../../../../common/callApi';
import AddToCart from '../../../../common/add-to-cart/addToCart';

const ItemDetail = (props) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await callApi(`products?id=${props.match.params.id}`, 'get', null).then(res => {
        if(res) {
          if(res.data.length > 0) {
            setData(res.data[0]);
          }
        }
      })
    }
    fetchData()
  }, [props.match.params.id]);

  let oldPrice = data.oldPrice ? `$${data.oldPrice}` : '';
  return (
    <div className='col-12 ml-2'>
      <div className='product-details'>
        <h2 className='product-name text-uppercase my-3'>{data.name}</h2>
        <div className="my-2">
          <div className='product-rating'>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star'></i>
            <i className='fa fa-star-o'></i>
          </div>
        </div>
        <div className="product-detail-price my-2">
          <h3 className='product-price'>
            ${data.newPrice} <del className='product-old-price'>{oldPrice}</del>
          </h3>
          <span className='product-available text-uppercase'>In Stock</span>
        </div>
        <p className="my-3">
          {data.detail}
        </p>

        <div className='add-to-cart'>
          <div className='qty-label'>
            <div className='input-number'>
            <label className="col-form-label mr-3" style={{fontSize: '1rem', fontWeight:500}}>Quantity</label>
              <input type='number' className="form-control" />
            </div>
          </div>
          <div className="col-12">
          <AddToCart id={data.id}/>
          </div>
        </div>

      </div>
    </div>
  )
}

export default withRouter(ItemDetail)
