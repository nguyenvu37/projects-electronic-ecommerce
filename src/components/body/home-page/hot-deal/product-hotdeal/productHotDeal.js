import React, {useState, useEffect} from 'react'
import './productHotDeal.css'
import { Link } from 'react-router-dom'

const ProductHotDeal = () => {
  const [hotDealTime, setHotDealTime] = useState(0);
  const [day, setDay] = useState(0);
  const [hours, setHours] = useState(0);
  const [minute, setMinute] = useState(0);
  const [sec, setSec] = useState(0);
  const currentTime = Date.now();

  useEffect(() => {
    let timeReport = 291448019;
    let hotDealTimes = currentTime + timeReport;
    setHotDealTime(hotDealTimes);
  }, [])

  // const countDown = setInterval(() => {
  //   console.log('test')
  //   let timeRest = hotDealTime - currentTime;
  //   let day = Math.floor(timeRest/(1000*60*60*24));
  //   let hours = Math.floor(timeRest%(1000*60*60*24)/(1000*60*60));
  //   let minute = Math.floor(timeRest%(1000*60*60)/(1000*60));
  //   let sec = Math.floor(timeRest%(1000*60)/(1000));
  //   setDay(day);
  //   setHours(hours);
  //   setMinute(minute)
  //   setSec(sec);
  //   console.log('sec', sec)
  //   if(timeRest <= 0) clearInterval(countDown);
  // }, 2000)

  return (
    <div className='hot-deal'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='hot-deal'>
              <ul className='hot-deal-countdown'>
                <li>
                  <div>
                    <h3>{day}</h3>
                    <span>Days</span>
                  </div>
                </li>
                <li>
                  <div>
                    <h3>{hours}</h3>
                    <span>Hours</span>
                  </div>
                </li>
                <li>
                  <div>
                    <h3>{minute}</h3>
                    <span>Mins</span>
                  </div>
                </li>
                <li>
                  <div>
                    <h3>{sec}</h3>
                    <span>Secs</span>
                  </div>
                </li>
              </ul>
              <h2 className='text-uppercase'>hot deal this week</h2>
              <p>New Collection Up to 50% OFF</p>
              <Link className="btn-show text-uppercase" to="/hot-deals">
                Shop now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductHotDeal
