import { useState, useEffect } from "react";
import "./index.css";
import CoinInfo from "./components/CoinInfo";
import SideNav from "./components/SideNav";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    async function fetchAllCoinData() {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${API_KEY}`
      );
      const data = await response.json();
      setList(data);
      setFilteredResults(Object.keys(data.Data));
    }
    fetchAllCoinData().catch(console.error);
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "" && list) {
      const filteredData = Object.keys(list.Data).filter((item) =>
        list.Data[item].FullName.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else if (list) {
      setFilteredResults(Object.keys(list.Data));
    }
  };

  return (
    <>
      <SideNav />
      <div className="whole-page">
        <h1>My Crypto List</h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={(inputString) => searchItems(inputString.target.value)}
        />
        <ul>
          {list &&
            (searchInput.length > 0
              ? filteredResults
                  .filter(
                    (coin) =>
                      list.Data[coin].IsTrading &&
                      list.Data[coin].Algorithm !== "N/A" &&
                      list.Data[coin].ProofType !== "N/A"
                  )
                  .map((coin) => (
                    <CoinInfo
                      key={coin}
                      image={list.Data[coin].ImageUrl}
                      name={list.Data[coin].FullName}
                      symbol={list.Data[coin].Symbol}
                    />
                  ))
              : Object.entries(list.Data)
                  .filter(
                    ([, coinData]) =>
                      coinData.IsTrading &&
                      coinData.Algorithm !== "N/A" &&
                      coinData.ProofType !== "N/A"
                  )
                  .map(([coin, coinData]) => (
                    <CoinInfo
                      key={coin}
                      image={coinData.ImageUrl}
                      name={coinData.FullName}
                      symbol={coinData.Symbol}
                    />
                  )))}
        </ul>
      </div>
    </>
  );
}

export default App;