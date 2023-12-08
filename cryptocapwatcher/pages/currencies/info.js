import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";

const styles = {
  tabItem: `px-2`,
  tabContainer: `flex items-center p-2 rounded-xl bg-[#222531] border border-gray-500/10 text-sm`,
  info: `min-h-screen`,
  main: `text-white mx-auto max-w-screen-2xl flex items-center justify-center`,
  flexStart: `flex items-start`,
  flexBetween: `flex justify-between`,
  flexBetweenCenter: `flex justify-between items-center`,
  flexColumn: `flex flex-col`,
  twoColumnGrid: `grid grid-cols-2 gap-4`,
  column: `flex flex-col mb-4`,
  title: `text-gray-500 text-sm mb-1`,
  data: `text-white`,
};

const Info = () => {
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { query } = router;
  const coin = query.coin;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://cryptowatcher-backend.onrender.com/api/getsinglecoin/${coin}`);
        const data = await response.json();
        setCoinData(data.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    if (coin) {
      fetchData();
    }
  }, [coin]);
  return (
    <div className={styles.info}>
      <Header />
      <div className='mt-10' />
      {coinData && (
        <main className={styles.main}>
          <div className={styles.flexStart}>
            <div className={styles.tabContainerWrapper}>
              <div className={styles.flexBetween}>
                {loading && <p>Loading...</p>}
                {
                  !loading && (
                    <div className={styles.twoColumnGrid}>
                      <div className={styles.column}>
                        <div className={styles.title}>Rank</div>
                        <div className={styles.data}>{coinData["#"]}</div>
                      </div>
                      <div className={styles.column}>
                        <div className={styles.title}>Name</div>
                        <div className={styles.data}>{coinData["Name"]}</div>
                      </div>
                      <div className={styles.column}>
                        <div className={styles.title}>1h %</div>
                        <div className={styles.data}>{coinData["1h %"]}</div>
                      </div>
                      <div className={styles.column}>
                        <div className={styles.title}>24h %</div>
                        <div className={styles.data}>{coinData["24h %"]}</div>
                      </div>
                      <div className={styles.column}>
                        <div className={styles.title}>7d %</div>
                        <div className={styles.data}>{coinData["7d %"]}</div>
                      </div>
                      <div className={styles.column}>
                        <div className={styles.title}>Market Cap</div>
                        <div className={styles.data}>{coinData["Market Cap"]}</div>
                      </div>
                      <div className={styles.column}>
                        <div className={styles.title}>Volume(24h)</div>
                        <div className={styles.data}>{coinData["Volume(24h)"]}</div>
                      </div>
                      <div className={styles.column}>
                        <div className={styles.title}>Circulating Supply</div>
                        <div className={styles.data}>{coinData["Circulating Supply"]}</div>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Info;
