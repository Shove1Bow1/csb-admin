import { child, get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { dbthongke } from "../../firebase/firebase";
import ChartReport from "./ChartReport";
import ChartSearch from "./ChartSearch";

export default function Chart() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <ChartReport />
      <ChartSearch />
    </div>
  );
}
