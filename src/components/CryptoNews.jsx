import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function CryptoNews() {
  const [newsList, setNewsList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchNews() {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${API_KEY}`
      );
      const data = await response.json();
      if (data.Response === "Error") {
        setError(data.Message);
        setNewsList([]);
      } else {
        setNewsList(data.Data);
        setError("");
      }
    }
    fetchNews().catch(console.error);
  }, []);

  return (
    <div>
      <h3>Crypto News</h3>
      <ul className="side-list">
        {error ? (
          <li className="news-article" style={{ color: "red" }}>{error}</li>
        ) : (
          newsList.map((article) => (
            <li className="news-article" key={article.id}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default CryptoNews;