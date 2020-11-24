import React, { useEffect, useState } from "react";
import { nameEle } from "./constantsVarlue";

const MenuComponent = (props) => {
  const [categories, setCategories] = useState([]);
  const onFilterProduct = (e) => {
    props.onFilterProduct(e.target.name);
    onActiveCategory(e.target.name);
  };

  const onActiveCategory = (name) => {
    const index = nameEle.findIndex((ele) => ele.name === name);
    if (index === -1) return;
    const newArr = JSON.parse(JSON.stringify([...nameEle]));
    newArr[index].active = !newArr[index].active;
    return setCategories([...newArr]);
  };

  useEffect(() => {
    if (nameEle) setCategories([...nameEle]);
  }, []);

  return (
    <div className="section-title mt-3">
      <h2
        className="title text-uppercase"
        style={{
          fontWeight: 600,
          textShadow: "4px 4px 7px rgba(150, 152, 150, 1)",
        }}
      >
        {props.title}
      </h2>
      <div className="section-nav">
        <ul className="section-tab-nav tab-nav">
          {categories.map((item, i) => {
            return (
              <li key={i}>
                <button
                  onClick={onFilterProduct}
                  name={item.name}
                  className={`${
                    item.active ? "active text-uppercase" : "text-uppercase"
                  }`}
                >
                  {item.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MenuComponent;
