import React from "react";

function Filter({ turnDarkElements, setInput, setRegion }) {
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="filter-content __container">
      <input
        className={turnDarkElements()}
        type="text"
        placeholder="Search for a country..."
        onChange={handleInput}
      />
      <select
        onClick={(e) => {
          setRegion(e.target.value);
        }}
        className={turnDarkElements()}
      >
        <option value="All">All</option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}

export default Filter;
