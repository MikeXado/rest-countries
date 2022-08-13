import React from "react";
import { Link } from "react-router-dom";

function Card({ turnDarkElements, item, handleCurrentItem, currentItem }) {
  return (
    <Link to={"singlePage"}>
      <div
        className="cards-content__item item-card"
        onClick={() => {
          handleCurrentItem(item.name.common);
        }}
      >
        <div id="card" className={turnDarkElements()}>
          <img
            className="item-card__img"
            src={item.flags.png}
            alt="state-flag"
          />
          <div className="item-card__text">
            <div className="item-card__name">{item.name.common}</div>
            <div className="item-card__population">
              Population:{" "}
              <span className="population">
                {item.population
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </div>
            <div className="item-card__region">
              Region: <span className="region">{item.region}</span>
            </div>
            <div className="item-card__capital">
              Capital: <span className="capital">{item.capital}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
