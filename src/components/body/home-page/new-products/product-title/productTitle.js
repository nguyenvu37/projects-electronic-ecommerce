import React from 'react';
import { withRouter } from 'react-router-dom';

const nameEle = [
  { id: 1,
    name: 'laptop'
  },
  { id: 2,
    name: 'smartphone'
  },
  { id: 3,
    name: 'camera'
  },
  { id: 4,
    name: 'accessorie'
  }
];

const ProductTitle = (props) => {

  const onFilterProduct = (e) =>{
    props.onFilterProduct(e.target.name);
  }
  return (
    <div className='section-title mt-3'>
      <h2 className='title text-uppercase' style={{fontWeight: 600, textShadow:'4px 4px 7px rgba(150, 152, 150, 1)'}}>New Products</h2>
      <div className='section-nav'>
        <ul className='section-tab-nav tab-nav'>
        {nameEle.map((item, i) => {
          return (
            <li className="" key={i}>
              <button onClick={onFilterProduct} name={item.name} className="text-uppercase">
                {item.name}
              </button>
            </li>
          )
        })}
        </ul>
      </div>
    </div>
  )
}

export default withRouter(ProductTitle)
