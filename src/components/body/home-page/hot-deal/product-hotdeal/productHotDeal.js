import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../../../../firebase'
import './productHotDeal.css'

class ProductHotDeal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      seconds: 0,
      minute: 0,
      hours: 0,
      day: 0,
      time: 0
    }
    this.timeReport = Date.now() + 291448019
  }

  componentDidMount () {
    let data = []
    db.collection('time-hot-deal')
      .get()
      .then(snapshot =>
        snapshot.docs.map(doc => {
          data.push({ ...doc.data(), id: doc.id })
          console.log('data', data)
          this.setState({
            time: data[0].time
          })
          return true
        })
      )
  }

  countTime = setInterval(() => {
    let timeRest = new Date(`${this.state.time}`).getTime() - Date.now()
    let day = Math.floor(timeRest / (1000 * 60 * 60 * 24))
    let hours = Math.floor(
      (timeRest % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    let minute = Math.floor((timeRest % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((timeRest % (1000 * 60)) / 1000)

    this.setState({
      seconds: seconds,
      minute: minute,
      hours: hours,
      day: day
    })
    if (timeRest <= 0) clearInterval(this.countTime)
  }, 1000)

  render () {
    return (
      <div className='hot-deal'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='hot-deal'>
                <ul className='hot-deal-countdown'>
                  <li>
                    <div>
                      <h3>{this.state.day}</h3>
                      <span>Days</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>{this.state.hours}</h3>
                      <span>Hours</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>{this.state.minute}</h3>
                      <span>Mins</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>{this.state.seconds}</h3>
                      <span>Secs</span>
                    </div>
                  </li>
                </ul>
                <h2 className='text-uppercase'>hot deal this week</h2>
                <p>New Collection Up to 50% OFF</p>
                <Link className='btn-show text-uppercase' to='/hot-deals'>
                  Shop now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductHotDeal
