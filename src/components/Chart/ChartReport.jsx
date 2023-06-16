import { child, get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { dbthongke } from "../../firebase/firebase";

export default function ChartReport() {
  const dbRef = ref(dbthongke);
  const [dataChart, setDataChart] = useState(null);
  useEffect(() => {
    get(child(dbRef, `Report`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const dataChart = snapshot.val();
          setDataChart({
            series: [
              {
                name: "Times",
                data: Object.values(dataChart),
              },
            ],
            options: {
              chart: {
                height: 350,
                type: "line",
                zoom: {
                  enabled: false,
                },
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                curve: "straight",
              },
              title: {
                text: "Create report each month",
                align: "left",
              },
              grid: {
                row: {
                  colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                  opacity: 0.5,
                },
              },
              xaxis: {
                categories: Object.keys(dataChart),
              },
            },
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div id="chart">
      {dataChart && (
        <ReactApexChart
          options={dataChart.options}
          series={dataChart.series}
          type="line"
          width={500}
          height={500}
        />
      )}
    </div>
  );
}
