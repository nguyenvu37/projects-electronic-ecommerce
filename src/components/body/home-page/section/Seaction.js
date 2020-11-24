import React from "react";
import "./seaction.css";
import { Link } from "react-router-dom";
import Waitting from "./../../../../common/waiting";
import { titleSections } from "../../../../common/constantsVarlue";

const Seaction = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <div className="section-title col-12 mt-5">
            <h2
              className="text-uppercase"
              style={{
                fontWeight: 600,
                textShadow: "4px 4px 7px rgba(150, 152, 150, 1)",
              }}
            >
              Collection
            </h2>
          </div>
          <div className="container">
            <div className="row">
              {titleSections.length ? (
                titleSections.map((titleSection, i) => {
                  return (
                    <div className="shop col-md-3 col-xs-6" key={i}>
                      <div className="shop-img">
                        <img src={titleSection.img} alt="" />
                        <div className="shop-body">
                          <h3 style={{ fontSize: "1.2rem" }}>
                            {titleSection.name}
                            <br />
                            Collection
                          </h3>
                          <Link to={titleSection.path} className="cta-btn">
                            Shop now{" "}
                            <i className="fa fa-arrow-circle-right"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <Waitting customer={{ position: "relative", top: "-50px" }} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seaction;
