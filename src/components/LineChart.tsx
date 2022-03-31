import React from "react";

import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import "../styles/LineChart.css";
interface props {
  coinHistory: any;
  currentPrice: string;
  coinName: string;
  timeUnit: string;
}
const LineChart = ({
  coinHistory,
  currentPrice,
  coinName,
  timeUnit,
}: props) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp * 1000)
    );
  }

  const data = {
    labels: coinTimestamp.reverse(),
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice.reverse(),
        fill: false,
        backgroundColor: "#2688f8",
        borderColor: "#2688f8",
        pointRadius: 0,
      },
    ],
  };

  const options: any = {
    scales: {
      x: {
        display: true,
        ticks: {
          autoSkip: false,
        },
        type: "time",
        time: {
          unit: timeUnit,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
        },
        grid: {
          display: false,
        },
      },
    },

    tooltips: {
      mode: "index",
      intersect: false,
    },
    hover: {
      mode: "index",
      intersect: false,
    },
  };

  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    TimeScale,
    Tooltip
  );

  return (
    <>
      <div className="chart">
        <p>{coinName} Price Chart</p>
        <div className="chart-price">
          <p>
            Current {coinName} Price: {currentPrice}
          </p>
          <p
            className={
              parseFloat(coinHistory?.data?.change) < 0
                ? "decreasing change"
                : "increasing change"
            }
          >
            {coinHistory?.data?.change}%
          </p>
        </div>
      </div>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
