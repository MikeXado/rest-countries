import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function SinglePage({ turnDarkElements, currentItem }) {
  const [languages, setLanguages] = useState("");

  useEffect(() => {
    setLanguages(Object.values(currentItem?.languages));
  }, [currentItem]);

  return (
    <div className="single-page __container">
      <div className="content-single">
        <Link to={"/"}>
          <button id="btn-back" className={turnDarkElements()}>
            {" "}
            <FontAwesomeIcon icon={faArrowLeft} className="fa-arrow" /> Back
          </button>
        </Link>
        <div className="content-single__current-state">
          <img src={currentItem?.flags.png} alt="flag" />
          <div className="content-single__text text-content">
            <div className="text-content__name">{currentItem?.name.common}</div>
            <div className="text-content__description-list">
              <ul>
                <li>
                  Native Name: <span>{"name"}</span>
                </li>
                <li>
                  Population:{" "}
                  <span>
                    {currentItem?.population
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                </li>
                <li>
                  Region: <span>{currentItem?.region}</span>
                </li>
                <li>
                  Sub Region: <span>{currentItem?.subregion}</span>
                </li>
                <li>
                  Capital: <span>{currentItem?.capital}</span>
                </li>
              </ul>
              <ul>
                <li>
                  Top Level Domain: <span>{currentItem?.tld}</span>
                </li>
                <li>
                  Currencies:{" "}
                  <span>
                    {Object.getOwnPropertyNames(currentItem?.currencies) + ""}
                  </span>
                </li>
                <li>
                  Languages:{" "}
                  <span>
                    {languages[0] + (languages[1] ? "," + languages[1] : "")}
                  </span>
                </li>
              </ul>
            </div>
            <div className="text-content__borders">
              Border Countries:
              {currentItem.borders
                ? currentItem?.borders?.map((item, index) => {
                    return (
                      <span key={index} className={turnDarkElements()}>
                        {item}
                      </span>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
