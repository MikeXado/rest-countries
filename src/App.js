import "./App.scss";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import Filter from "./components/filter/Filter";
import Card from "./components/Card/Card";
import { Routes, Route, Link } from "react-router-dom";
import SinglePage from "./pages/SinglePage";
import Skeleton from "./components/skeleton/Skeleton";

function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    const initialValue = JSON.parse(saved);
    return initialValue || "white";
  });
  const [countries, setCountries] = useState([]);
  const [filtred, setFiltred] = useState([]);
  const [region, setRegion] = useState("All");
  const [input, setInput] = useState("");
  const [currentItem, setCurrentItem] = useState(() => {
    const saved = localStorage.getItem("currentItem");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [skeleton, setSkeleton] = useState(true);
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem("darkButtonState");
    const initialValue = JSON.parse(saved);
    return initialValue || false;
  });

  const api = "https://restcountries.com/v3.1/all";

  useEffect(() => {
    fetch(api)
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, [api]);

  useEffect(() => {
    setTimeout(() => {
      setSkeleton(false);
      setFiltred(countries);
    }, 1000);
  }, [countries]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(dark));
    localStorage.setItem("darkButtonState", JSON.stringify(checked));
  }, [dark, checked]);

  useEffect(() => {
    const search = countries.filter((item) => {
      return (
        item.name.common.toLowerCase().includes(input.toLowerCase()) ||
        item.region.toLowerCase().includes(input.toLowerCase()) ||
        item.latlng.toString().includes(input)
      );
    });
    setSkeleton(true);
    setTimeout(() => {
      setSkeleton(false);
      setFiltred(search);
    }, 1000);
  }, [input, countries]);

  useEffect(() => {
    const regionFilter = countries.filter((country) => {
      return region === "All" ? country : country.region === region;
    });
    setSkeleton(true);
    setTimeout(() => {
      setSkeleton(false);
      setFiltred(regionFilter);
    }, 1000);
  }, [region, countries]);

  const turnDarkBg = () => {
    return dark === "dark" ? "dark-bg" : "white-bg";
  };
  const turnDarkElements = () => {
    return dark === "dark" ? "dark-elements" : "white-elements";
  };

  const handleCurrentItem = (name) => {
    const findCurrent = filtred.find((country) => country.name.common === name);
    localStorage.setItem("currentItem", JSON.stringify(findCurrent));
    setCurrentItem(findCurrent);
  };

  let ifDark = dark === "dark";
  return (
    <div className="App">
      <div className={turnDarkBg()}>
        <div className={turnDarkElements()}>
          <div className="countries-header __container">
            <div className="countries-header__content">
              <Link
                style={{
                  color: "hsl(200, 15%, 8%)",
                  ...(ifDark ? { color: "hsl(0, 0%, 100%)" } : {}),
                }}
                to={"/"}
              >
                <h1 className="countries-header__title">Where in the world?</h1>
              </Link>
              <div className="countries-header__dark-button">
                <input
                  onClick={() =>
                    dark === "white" ? setDark("dark") : setDark("white")
                  }
                  type="checkbox"
                  className="checkbox"
                  id="checkbox"
                  checked={checked}
                  value={checked}
                  onChange={(e) => {
                    setChecked(e.target.checked);
                  }}
                />
                <label
                  htmlFor="checkbox"
                  className="label"
                  style={{
                    backgroundColor: "hsl(200, 15%, 8%)",
                    ...(ifDark ? { backgroundColor: "hsl(0, 0%, 100%)" } : {}),
                  }}
                >
                  <FontAwesomeIcon icon={faMoon} className="fa-moon" />
                  <FontAwesomeIcon icon={faSun} className="fa-sun" />
                  <div
                    className="ball"
                    style={{
                      backgroundColor: "white",
                      ...(ifDark
                        ? { backgroundColor: "hsl(209, 23%, 22%)" }
                        : {}),
                    }}
                  ></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <div className="countries-content">
                <Filter
                  turnDarkBg={turnDarkBg}
                  turnDarkElements={turnDarkElements}
                  setInput={setInput}
                  setRegion={setRegion}
                />
                <div className="countries-content__cards cards-content __container">
                  {skeleton
                    ? [...new Array(9)].map((_, index) => (
                        <Skeleton key={index} className="skeleton" />
                      ))
                    : filtred.map((item, index) => {
                        return (
                          <Card
                            key={index}
                            turnDarkElements={turnDarkElements}
                            item={item}
                            handleCurrentItem={handleCurrentItem}
                            currentItem={currentItem}
                          />
                        );
                      })}
                </div>
              </div>
            }
          />
          <Route
            path="singlePage"
            element={
              <SinglePage
                turnDarkElements={turnDarkElements}
                currentItem={currentItem}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
