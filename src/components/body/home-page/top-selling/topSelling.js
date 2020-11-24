import React, { useState } from "react";
import ProductTopSelling from "./product/productTopSelling";
import { Wappers } from "./../../../../common/style";
import MenuComponent from "../../../../common/menuComponent";

const TopSelling = () => {
  const [category, setCategory] = useState("");

  const onFilterProduct = (name) => {
    setCategory(name);
  };
  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <MenuComponent
              onFilterProduct={onFilterProduct}
              title={"Top Selling"}
            />
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="products-tabs">
                <div id="tab1" className="tab-pane active">
                  <Wappers>
                    <ProductTopSelling dataCategory={category} />
                  </Wappers>
                  <div id="slick-nav-1" className="products-slick-nav"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSelling;
