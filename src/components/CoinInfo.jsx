import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function CoinInfo({ image, name, symbol }) {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function getCoinPrice() {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`,
          { signal: controller.signal }
        );
        const data = await response.json();
        setPrice(data);
      } catch (error) {
        if (error.name === "AbortError") {
          // Request was aborted, do nothing
        } else {
          console.error(error);
        }
      }
    }

    getCoinPrice();

    return () => controller.abort();
  }, [symbol]);

  return (
    <li className="main-list" key={symbol}>
      <div className="coin-left">
        {image && (
          <img
            className="icons"
            src={`https://www.cryptocompare.com${image}`}
            alt={`Small icon for ${name} crypto coin`}
          />
        )}
        <Link className="main-link" to={`/coinDetails/${symbol}`}>
          {name} ({symbol})
        </Link>
      </div>
      <span className="coin-price">
        {price && price.USD ? `$${price.USD} USD` : ""}
      </span>
    </li>
  );
}

export default CoinInfo;