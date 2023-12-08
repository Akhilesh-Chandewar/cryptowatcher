import { useState, useEffect } from "react"
import CryptoTableHeader from "./CryptoTableHeader"
import CryptoTableRow from "./CryptoTableRow"

const CryptoTable = () => {
  const [coinData, setCoinData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://cryptowatcher-backend.onrender.com/api/getdata');
        const data = await response.json();
        let filteredResponse = data.data.slice(0, 10);
        setCoinData(filteredResponse);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='text-white font-bold'>
      <div className='mx-auto'>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <table className="table-auto w-full">
            <CryptoTableHeader />
            {coinData.map((coin, index) => (
              <CryptoTableRow key={index} num={index + 1} name={coin.Name} price={coin.Price} market_cap={coin["Market Cap"]} circulating_supply={coin["Circulating Supply"]} />
            ))}
          </table>
        )}
      </div>
    </div>
  )
}

export default CryptoTable