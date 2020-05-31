import React from 'react';
import AccessoriesItem from './accessoriesItem';
import './../../../common/style.css';

const AccessoriesPage = () => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-12">
					<h2
						className="text-uppercase my-4"
						style={{
							fontWeight: '600',
							textShadow: '4px 4px 7px rgba(150, 152, 150, 1)'
						}}
					>
						Accessories
					</h2>
				</div>
				<div className="col-12">
					<div className="hotdeal">
						<AccessoriesItem />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccessoriesPage;
