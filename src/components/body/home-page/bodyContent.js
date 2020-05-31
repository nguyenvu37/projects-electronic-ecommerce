import React from 'react'
import Seaction from './section/Seaction'
import NewProducts from './new-products/products'
import ProductHotDeal from './hot-deal/product-hotdeal/productHotDeal'
import TopSelling from './top-selling/topSelling'

const BodyContent = (props) => {
  return (
    <div>
      <Seaction />
      <NewProducts />
      <ProductHotDeal />
      <TopSelling />
    </div>
  )
}

export default BodyContent
