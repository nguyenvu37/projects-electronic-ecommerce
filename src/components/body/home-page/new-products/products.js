import React, {useState} from 'react';
import './products.css';
import ProductTitle from './product-title/productTitle';
import Product from './product/product';
import { Wappers } from '../../../../common/style';


const NewProducts = () => {
	const [category, setCategory] = useState('');

	const onFilterProduct = (name) => {
		setCategory(name);
	}
    return (
        <div className="section mt-5">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<ProductTitle onFilterProduct={onFilterProduct}/>
					</div>
					<div className="col-md-12">
						<div className="row">
							<div className="products-tabs">
								<Wappers>
									<Product dataCategory={category}/>
								</Wappers>
								<div id="slick-nav-1" className="products-slick-nav"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    );
};

export default NewProducts;