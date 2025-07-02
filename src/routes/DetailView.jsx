import { useParams } from "react-router-dom";
import CoinDetail from "../components/CoinDetail";
import NotFound from "./NotFound.jsx";

const DetailView = () => {
  const { symbol } = useParams();

  // Optionally, you can add a check for valid symbol format here
  // But let CoinDetail handle the fetch and error display

  return (
    <div>
      <CoinDetail symbol={symbol} />
    </div>
  );
}

export default DetailView;