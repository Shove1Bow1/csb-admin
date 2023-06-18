import { child, get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { dbthongke } from "../../firebase/firebase";

export default function ChartSearch() {
  const dbRef = ref(dbthongke);
  console.log(dbRef);
  const [dataChart, setDataChart] = useState(null);
  useEffect(() => {
    get(child(dbRef, `Search`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const snapData = snapshot.val();
          setDataChart({
            series: [
              {
                name: "Times",
                data: Object.values(snapData),
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
                text: "Create search each month",
                align: "left",
              },
              grid: {
                row: {
                  colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                  opacity: 0.5,
                },
              },
              xaxis: {
                categories: Object.keys(snapData),
              },
            },
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log("hello",dataChart?dataChart.series[0].data.reverse():null)
  return (
    <div id="chart">
      {dataChart && (
        <ReactApexChart
          options={dataChart.options}
          series={dataChart.series}
          type="line"
          width={700}
          height={500}
        />
      )}
    </div>
  );
}
