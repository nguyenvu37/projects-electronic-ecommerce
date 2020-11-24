import React, { useState } from "react";
import "./products.css";
import Product from "./product/product";
import { Wappers } from "../../../../common/style";
import MenuComponent from "../../../../common/menuComponent";

const NewProducts = () => {
  const [category, setCategory] = useState("");

  const onFilterProduct = (name) => {
    setCategory(name);
  };
  return (
    <div className="section mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <MenuComponent
              onFilterProduct={onFilterProduct}
              title={"New Products"}
            />
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="products-tabs">
                <Wappers>
                  <Product dataCategory={category} />
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
