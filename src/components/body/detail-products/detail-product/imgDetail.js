import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { withRouter } from 'react-router-dom'
import {db} from '../../../../firebase'

const ImgDetail = props => {
  const [imgProducts, setImgProducts] = useState([])

  useEffect(() => {
    console.log('props.match', props.match.params.id)
    const fetchData = async () => {
      let products = [];
      let data = [];
      await db.collection(`products`)
        .get()
        .then(snapshot => snapshot.docs.map(doc => {
          products.push({...doc.data(), id: doc.id})
          
        }))
        console.log('products', products)

        products.filter(item => {
          if(item.id === props.match.params.id) {
            data.push({...item})
          }
        })
        console.log('data', data)
        setImgProducts([...data[0].imgDetail])
    }
    fetchData()
  }, [props.match.params.id])

  let settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <Slider {...settings}>
      {imgProducts.map((item, i) => {
        return (
          <div className='product-preview' key={i}>
            <img src={require(`./../../../../img/${item}`)} alt='' />
          </div>
        )
      })}
    </Slider>
  )
}

export default withRouter(ImgDetail)
