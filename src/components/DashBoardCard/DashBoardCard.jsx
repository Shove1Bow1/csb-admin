import React, { useEffect } from "react";
import { dbthongke } from "../../firebase/firebase";
import { onValue, ref } from "firebase/database";
import dayjs from "dayjs";
import NumberOfReport from "./NumberOfReport";
import NumberOfSearch from "./NumberOfSerch";
import DashBoardThongSo from "./DashBoardThongSo";

function DashBoardCard(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <NumberOfReport />
      <NumberOfSearch />
    </div>
  );
}

export default DashBoardCard;
