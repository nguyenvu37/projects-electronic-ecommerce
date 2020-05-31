import React from 'react';
import './detailProduct.css';
import ItemDetail from './itemDetail';
import ImgDetail from './imgDetail';
import ItemRelated from './itemRelated';
import { Wappers } from '../../../../common/style';

const DetailProduct = () => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-6 col-ms-12">
					<ImgDetail />
				</div>
				<div className="col-md-6 col-ms-12 mt-5">
					<ItemDetail />
				</div>
				<div className="col-12 related">
					<Wappers>
						<ItemRelated />
					</Wappers>
				</div>
			</div>
		</div>
	);
};

export default DetailProduct;
