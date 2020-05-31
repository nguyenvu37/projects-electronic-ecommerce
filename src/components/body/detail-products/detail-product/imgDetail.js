import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import callApi from '../../../../common/callApi'
import { withRouter } from 'react-router-dom'

const ImgDetail = props => {
  const [imgProducts, setImgProducts] = useState([])

  useEffect(() => {
    console.log('props.match', props.match.params.id)
    const fetchData = async () => {
      await callApi(`products?id=${props.match.params.id}`, 'get', null).then(
        res => {
          if (res) {
            if (res.data.length > 0) {
              setImgProducts([...res.data[0].imgDetail])
            }
          }
        }
      )
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
