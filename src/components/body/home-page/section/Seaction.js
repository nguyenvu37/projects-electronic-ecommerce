import React from 'react'
import './seaction.css'
import { Link } from 'react-router-dom'
import Waitting from './../../../../common/waiting'

const titleSections = [
  {
    img: require('./../../../../img/shop01.png'),
    path: '/laptops',
    name: 'Laptop'
  },
  {
    img: require('./../../../../img/shop03.png'),
    path: '/accessories',
    name: 'Accessories'
  },
  {
    img: require('./../../../../img/shop02.png'),
    path: '/cameras',
    name: 'Cameras'
  },
  {
    img: require('./../../../../img/shop04.jpg'),
    path: '/smartphones',
    name: 'Smartphones'
  }
]

const Seaction = () => {
  return (
    <div className='section'>
      <div className='container'>
        <div className='row'>
          <div className='col-12 mt-5'>
            <h2 className='text-uppercase' style={{ fontWeight: 600, textShadow:'4px 4px 7px rgba(150, 152, 150, 1)' }}>
              Collection
            </h2>
          </div>
          <div className='container'>
            <div className='row'>
              {titleSections.length>0 ? (
                titleSections.map((titleSection, i) => {
                return (
                  <div className='shop col-md-3 col-xs-6' key={i}>
                    <div className='shop-img'>
                      <img src={titleSection.img} alt='' />
                    </div>
                    <div className='shop-body'>
                      <h3 style={{fontSize: '1.2rem'}}>
                        {titleSection.name}
                        <br />
                        Collection
                      </h3>
                      <Link to={titleSection.path} className='cta-btn'>
                        Shop now <i className='fa fa-arrow-circle-right'></i>
                      </Link>
                    </div>
                  </div>
                )
              })
              ) : <Waitting customer={{ position: "relative", top: "-50px" }} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Seaction
