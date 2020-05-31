import React, {useState, useEffect} from 'react';
import callApi from '../../../../../common/callApi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {Link} from 'react-router-dom';
import Waitting from './../../../../../common/waiting';
import AddToCart from '../../../../../common/add-to-cart/addToCart';

const ProductTopSelling = (props) => {
  const [ newProducts, setNewProducts ] = useState([]);
	const [newDatas, setNewDatas] = useState([]);

	let settings = {
		infinite: true,
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: true,
		slidesToShow: 4,
		slidesToScroll: 1
  };
  
  useEffect(() => {
		const fetchData = async () => {
			await callApi(`products?discountProduct=${true}`, 'get', null).then((res) => {
				if (res) {
					if (res.data.length > 0) {
            let data = [ ...res.data ];
            setNewProducts(data);
            setNewDatas(data);
          }
				}
			});
		};
		fetchData();
  },[]);

  useEffect(() => {
		let category = props.dataCategory;
		console.log('category', category)
		let products = newProducts.filter(item => item.category === category);
		setNewDatas([...products])
		
	}, [props.dataCategory])
  
  return (
    newDatas.length > 0 ? (
      <div className='products-slick'>
      <Slider {...settings}>
        {newDatas.map((product, i) => {
          let oldPrice = product.oldPrice ? `$${product.oldPrice}` : ''
          let discount =
            product.discount === '' ? (
              ''
            ) : (
              <span className='sale'>{`-${product.discount}%`}</span>
            )
          return (
            <div className='product' key={i}>
              <div className='product-img'>
                <img
                  src={require(`./../../../../../img/${product.img}`)}
                  alt=''
                />
                <div className='product-label'>
                  {discount}
                </div>
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
          )
        })}
      </Slider>
    </div>
    ) : <Waitting custom={{ position: "relative", top: "20px" }} />
  )
}

export default ProductTopSelling
