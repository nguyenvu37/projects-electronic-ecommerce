import React, {useState, useEffect} from 'react';
import Slider from 'react-slick';
import callApi from '../../../../common/callApi';
import {withRouter, Link} from 'react-router-dom';
import AddToCart from '../../../../common/add-to-cart/addToCart';

const ItemRelated = (props) => {

  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      await callApi(`products?id=${props.match.params.id}`, 'get', null).then(res => {
        if(res) {
          if(res.data.length > 0) {
            console.log('res.data', res.data);
            setCategory(res.data[0].category);
          }
        }
      })
    }
    fetchCategory();
  }, [props.match.params.id]);

  useEffect(() => {
    const fetchData = async () => {
      await callApi(`products?category=${category}`, 'get', null).then(res => {
        if(res) {
          if(res.data.length > 0) {
            setData([...res.data])
          }
        }
      })
    }
    fetchData();
  }, [category]);

  let settings = {
    infinite: false,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12 mt-5'>
          <div className='section-title text-center'>
            <h3 className='title text-uppercase' style={{ fontWeight: 600 }}>
              Related Products
            </h3>
          </div>
        </div>
        <Slider {...settings}>
        {data.map((dataItem, i) => {
          let oldPrice = dataItem.oldPrice ? `$${dataItem.oldPrice}` : ''
          let discount =
            dataItem.discount === '' ? (
              ''
            ) : (
              <span className='sale'>{`-${dataItem.discount}%`}</span>
            )
          return (
            <div className='' key={i}>
              <div className='product'>
                <div className='product-img'>
                  <img
                    src={require(`./../../../../img/${dataItem.img}`)}
                    alt=''
                  />
                  <div className='product-label'>
                    {discount}
                  </div>
                </div>
                <div className='product-body'>
                  <p className='product-category'>Category</p>
                  <h3
                    className='product-name text-uppercase'
                    style={{ fontSize: '1rem', fontWeight: 600 }}
                  >
                    <Link to={`/detail/${dataItem.id}`}>{dataItem.name}</Link>
                  </h3>
                  <h4 className='product-price'>
                    ${dataItem.newPrice} <del className='product-old-price'>{oldPrice}</del>
                  </h4>
                  <div className='product-rating'></div>
                  <div className='product-btns'>
                    <button className='add-to-compare'>
                      <i className='fas fa-exchange-alt'></i>
                      <span className='tooltipp'>add to compare</span>
                    </button>
                    <button className='quick-view'>
                      <i className='fa fa-eye'></i>
                      <span className='tooltipp'>quick view</span>
                    </button>
                  </div>
                </div>
                <AddToCart id={dataItem.id}/>
              </div>
            </div>
          )
        })}
        </Slider>
      </div>
    </div>
  )
}

export default withRouter(ItemRelated)
