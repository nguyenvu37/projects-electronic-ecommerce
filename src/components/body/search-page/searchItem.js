import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Waitting from './../../../common/waiting';
import MyPagination from '../../../common/pagination';
import AddToCart from '../../../common/add-to-cart/addToCart';


function SearchItem (props) {
  const _limit = 6;
	const [ currentPage, setCurrentPage ] = useState(1);
  const [ indexDataRender, setIndexDataRender ] = useState(0);
  const products = props.products;
  
  const nextPage = (number) => {
		setIndexDataRender(number * _limit);
		setCurrentPage(currentPage + 1);
	};
	const prePage = (number) => {
		setIndexDataRender((number - 2) * _limit);
		setCurrentPage(currentPage - 1);
	};

	const pagination = () => {
		let datanew = [];
		if (products.length <= 0) return;
		let end = indexDataRender + _limit >= products.length ? products.length : indexDataRender + _limit;

		if (products.length === 1) return products;
		for (let i = indexDataRender; i < end; i++) {
			datanew.push(products[i]);
		}
		return datanew;
	};
  
  return (
    products.length > 0 ? (
      <div className='row'>
      {pagination()&&pagination().map((product, i) => {
        let oldPrice = product.oldPrice ? `$${product.oldPrice}` : ''
        let discount =
          product.discount === '' ? (
            ''
          ) : (
            <span className='sale'>{`-${product.discount}%`}</span>
          )
        return (
          <div className="col-lg-4 col-md-6 col-12" key={i}>
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
      <div className="container mt-5">
				<MyPagination
					nextPage={nextPage}
					prePage={prePage}
					data={products}
					_limit={_limit}
					currentPage={currentPage}
				/>
			</div>
    </div>
    ) : <Waitting custom={{ position: "relative", top: "-10px" }} />
  )
}

export default SearchItem
