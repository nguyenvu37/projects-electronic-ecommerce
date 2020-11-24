import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../../../firebase";
import "./productHotDeal.css";

const ProductHotDeal = () => {
  const [day, setDay] = useState(0);
  const [hours, setHours] = useState(0);
  const [minute, setMinute] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let data = [];
    db.collection("time-hot-deal")
      .get()
      .then((snapshot) =>
        snapshot.docs.map((doc) => {
          data.push({ ...doc.data(), id: doc.id });
          let count = setInterval(() => {
            let timeRest = new Date(`${data[0].time}`).getTime() - Date.now();
            let day = Math.floor(timeRest / (1000 * 60 * 60 * 24));
            let hours = Math.floor(
              (timeRest % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            let minute = Math.floor(
              (timeRest % (1000 * 60 * 60)) / (1000 * 60)
            );
            let seconds = Math.floor((timeRest % (1000 * 60)) / 1000);

            setDay(day);
            setHours(hours);
            setMinute(minute);
            setSeconds(seconds);
            if (timeRest <= 0) clearInterval(count);
          }, 1000);
          return true;
        })
      );
  }, []);

  return (
    <div className="hot-deal">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="hot-deal">
              <ul className="hot-deal-countdown">
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
                    <h3>{seconds}</h3>
                    <span>Secs</span>
                  </div>
                </li>
              </ul>
              <h2 className="text-uppercase">hot deal this week</h2>
              <p>New Collection Up to 50% OFF</p>
              <Link className="btn-show text-uppercase" to="/hot-deals">
                Shop now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHotDeal;
