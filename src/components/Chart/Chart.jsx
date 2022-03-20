import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

import styles from "./Chart.module.css";

const Chart1 = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchAPI();
  }, []);

  // 꺾은선 그래프 (글로벌 그래프)
  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) =>
          new Date(date).toLocaleDateString()
        ),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  // 막대 차트 (국가별 데이터)
  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: ["rgba(0, 0, 255, 0.5)", "rgba(255, 0, 0, 0.5)"],
            data: [confirmed.value, deaths.value], // Chart1의 props를 통해 받음 (data)
          },
        ],
      }}
      options={{
        legend: { display: false }, // 범례
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;
  return (
    // country 데이터가 있으면 barchart를 보여주고, 그렇지 않으면 linechart를 보여주기
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart1;
