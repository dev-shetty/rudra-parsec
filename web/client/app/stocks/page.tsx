// "use client";
// import { useEffect, useState } from "react";

// const Dashboard: React.FC = () => {
//   const [intradayData, setIntradayData] = useState<[string, any][]>([]);
//   const [intradayFullData, setIntradayFullData] = useState<[string, any][]>([]);
//   const [intradayByMonthData, setIntradayByMonthData] = useState<
//     [string, any][]
//   >([]);

//   const fetchData = async (
//     url: string,
//     setData: React.Dispatch<React.SetStateAction<[string, any][]>>
//   ) => {
//     const response = await fetch(url);
//     const result = await response.json();
//     setData(Object.entries(result["Time Series (5min)"])); // Convert data to array of [timestamp, value]
//   };

//   useEffect(() => {
//     fetchData(
//       "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=U0QUU86I3A6WEUSN",
//       setIntradayData
//     );
//     fetchData(
//       "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&outputsize=full&apikey=U0QUU86I3A6WEUSN",
//       setIntradayFullData
//     );
//     fetchData(
//       "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&month=2009-01&outputsize=full&apikey=U0QUU86I3A6WEUSN",
//       setIntradayByMonthData
//     );
//   }, []);

//   return (
//     <div>
//       <h1>Stock Market Dashboard</h1>

//       <div>
//         <h2>Intraday Stock Data (Default)</h2>
//         <ul>
//           {intradayData.map(([timestamp, values]) => (
//             <li key={timestamp}>
//               {timestamp}: Open - {values["1. open"]}, Close -{" "}
//               {values["4. close"]}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h2>Intraday Stock Data (Full 30 Days)</h2>
//         <ul>
//           {intradayFullData.map(([timestamp, values]) => (
//             <li key={timestamp}>
//               {timestamp}: Open - {values["1. open"]}, Close -{" "}
//               {values["4. close"]}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h2>Intraday Stock Data (Given Month)</h2>
//         <ul>
//           {intradayByMonthData.map(([timestamp, values]) => (
//             <li key={timestamp}>
//               {timestamp}: Open - {values["1. open"]}, Close -{" "}
//               {values["4. close"]}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// pages/StockMarket/Dashboard.tsx

"use client";
// pages/index.tsx
import { CardsMetric } from "@/components/Stocks/CardsMetrix";

const HomePage: React.FC = () => {
  const stockData = [
    { average: 400, today: 240 },
    { average: 300, today: 139 },
    { average: 200, today: 980 },
    { average: 278, today: 390 },
    { average: 189, today: 480 },
    { average: 239, today: 380 },
    { average: 349, today: 430 },
  ];

  return (
    <div>
      <h1>Welcome to My Dashboard</h1>
      <CardsMetric
        title="Stock Metrics"
        description="Your stock metrics description"
        data={stockData}
      />
    </div>
  );
};

export default HomePage;
