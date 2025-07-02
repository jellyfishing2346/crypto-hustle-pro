import { useEffect, useState } from "react";
import CoinChart from "./CoinChart";
import NotFound from "../routes/NotFound.jsx";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function CoinDetail({ symbol }) {
    const [fullDetails, setFullDetails] = useState(null);

    useEffect(() => {
        const getCoinDetail = async () => {
            const details = await fetch(
                `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${API_KEY}`
            );
            const description = await fetch(
                `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${symbol}&api_key=${API_KEY}`
            );

            const detailsJson = await details.json();
            const descripJson = await description.json();

            setFullDetails({
                numbers: detailsJson.DISPLAY,
                textData: descripJson.Data,
            });
        };

        getCoinDetail().catch(console.error);
    }, [symbol]);


    if (!fullDetails) {
        return <div>Loading...</div>;
    }

    // If coin data is missing or invalid, show NotFound
    if (!fullDetails.textData[symbol] || !fullDetails.numbers[symbol]) {
        return <NotFound />;
    }

    return (
        <div>
            <h1>{fullDetails.textData[symbol].FullName}</h1>
            <img
                className="images"
                src={`https://www.cryptocompare.com${fullDetails.numbers[symbol].USD.IMAGEURL}`}
                alt={`Small icon for ${symbol} crypto coin`}
            />
            <div>{fullDetails.textData[symbol].Description}</div>
            <br />
            <div>
                This coin was built with the algorithm{" "}
                {fullDetails.textData[symbol].Algorithm}
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>Launch Date</th>
                        <td>{fullDetails.textData[symbol].AssetLaunchDate || "N/A"}</td>
                    </tr>
                    <tr>
                        <th>Website</th>
                        <td>
                            <a
                                href={fullDetails.textData[symbol].WebsiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {fullDetails.textData[symbol].WebsiteUrl || "N/A"}
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <th>Whitepaper</th>
                        <td>
                            <a
                                href={fullDetails.textData[symbol].Whitepaper?.Url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {fullDetails.textData[symbol].Whitepaper?.Url || "N/A"}
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <th>Monetary Symbol</th>
                        <td>{symbol}</td>
                    </tr>
                    <tr>
                        <th>Market</th>
                        <td>{fullDetails.numbers[symbol].USD.MARKET || "N/A"}</td>
                    </tr>
                    <tr>
                        <th>Last Transaction</th>
                        <td>{fullDetails.numbers[symbol].USD.LASTUPDATE || "N/A"}</td>
                    </tr>
                    <tr>
                        <th>Last Transaction Value</th>
                        <td>{fullDetails.numbers[symbol].USD.PRICE || "N/A"}</td>
                    </tr>
                    <tr>
                        <th>Volume</th>
                        <td>{fullDetails.numbers[symbol].USD.VOLUME24HOUR || "N/A"}</td>
                    </tr>
                    <tr>
                        <th>Today's Open Price</th>
                        <td>{fullDetails.numbers[symbol].USD.OPENDAY || "N/A"}</td>
                    </tr>
                    <tr>
                        <th>Highest Price during the Day</th>
                        <td>{fullDetails.numbers[symbol].USD.HIGHDAY || "N/A"}</td>
                    </tr>
                    <tr>
                        <th>Lowest Price during the Day</th>
                        <td>{fullDetails.numbers[symbol].USD.LOWDAY || "N/A"}</td>
                    </tr>
                    <tr>
                        <th>Change from Previous Day</th>
                        <td>{fullDetails.numbers[symbol].USD.CHANGEPCT24HOUR || "N/A"}</td>
                    </tr>
                    <tr>
                        <th>Market Cap</th>
                        <td>{fullDetails.numbers[symbol].USD.MKTCAP || "N/A"}</td>
                    </tr>
                </tbody>
            </table>
            <CoinChart
                symbol={symbol}
                market={fullDetails.numbers[symbol].USD.MARKET}
            />
        </div>
    );
}

export default CoinDetail;