import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://3cb978e1-7acd-4796-a0e5-28f562120490-00-2jm47cr9n02ln.picard.replit.dev:5000/api/analyze")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error fetching API:", err));
  }, []);

  if (!data) return <p>Loading crypto data...</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🚀 Scoutt Crypto Dashboard</h1>
      {Object.entries(data).map(([symbol, coin]) => (
        <div
          key={symbol}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "12px",
          }}
        >
          <h2>{coin.name} ({symbol})</h2>
          <p>💰 Price: ${coin.price}</p>
          <p>📊 Signal: <b>{coin.signal}</b></p>
          <p>📈 Sentiment: {coin.sentiment}</p>
          <ul>
            {coin.analysis.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}