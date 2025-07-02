import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label
} from "recharts";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinChart = ({ symbol, market }) => {
  const [histData, setHistData] = useState(null);

  useEffect(() => {
    const getCoinHist = async () => {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&e=${market}&limit=30&api_key=${API_KEY}`
      );
      const json = await response.json();
      setHistData(json.Data.Data);
    };
    getCoinHist().catch(console.error);
  }, [market, symbol]);

  // Clean and format the data for the chart
  const cleanData = (data) => {
    if (!data) return [];
    return data.map(item => ({
      time: new Date(item.time * 1000).toLocaleDateString("en-US"),
      "open price": item.open
    }));
  };

  return (
    <div className="recharts-container">
      <br />
      <h2>30-Day Price Data for {symbol}</h2>
      {histData && (
        <LineChart
          width={900}
          height={400}
          data={cleanData(histData)}
          margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
        >
          <Line
            type="monotone"
            dataKey="open price"
            stroke="#8884d8"
            activeDot={{ r: 5 }}
          />
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="time" interval={2} angle={20} dy={5}>
            <Label value="Date" offset={0} position="insideBottom" dy={50} />
          </XAxis>
          <YAxis
            label={{
              value: "Price",
              angle: -90,
              position: "insideLeft",
              textAnchor: "middle",
              dx: -18
            }}
          />
          <Tooltip />
        </LineChart>
      )}
    </div>
  );
};

export default CoinChart;