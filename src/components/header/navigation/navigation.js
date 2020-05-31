import React from 'react';
import './navigation.css';
import {NavLink} from 'react-router-dom';

const titleProducts = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Hot Deals',
    path: '/hot-deals'
  },
  {
    name: 'Laptops',
    path: '/laptops'
  },
  {
    name: 'SmartPhones',
    path: '/smartphones'
  },
  {
    name: 'Cameras',
    path: '/cameras'
  },
  {
    name: 'Accessories',
    path: '/accessories'
  },
];

export default function Navigation () {
  return (
    <div className='navigation'>
      <nav className='container'>
        <div className='responsive-nav'>
          <ul className='main-nav nav navbar-nav'>
          {titleProducts.map( (titleProduct, i) => {
            return (<NavLink 
                    key={i} 
                    to={titleProduct.path}
                    style={{textDecoration: 'none'}}
                    activeStyle={{color: '#D10024',borderBottom: '2px solid #D10024'}}
                    className='mr'
                    id={`nav-${i+1}`}
                  >
                    {titleProduct.name}
                  </NavLink>)
          })}
          </ul>
        </div>
      </nav>
    </div>
  )
}
