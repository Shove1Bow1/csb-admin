import { child, get, ref } from "@firebase/database";
import React, { useEffect } from "react";
import { formatCompactNumber } from "../../constant/formatNumber";
import { dbthongke } from "../../firebase/firebase";

function DashBoardThongSo(props) {
  const date = new Date();
  const month = date.getMonth() + 1;
  const [data, setData] = React.useState(null);
  let timeNow;
  if (date.getMonth() + 1 < 10) {
    timeNow = "1-0" + month + "-" + date.getFullYear();
  } else {
    timeNow = "1-" + month + "-" + date.getFullYear();
  }
  const dbRef = ref(dbthongke);
  useEffect(() => {
    get(child(dbRef, "Total"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const valueTotal = snapshot.val();
          const totalNumber =
            valueTotal.TotalPotential +
            valueTotal.TotalSpammer +
            valueTotal.TotalUnknow;

          setData({
            ...valueTotal,
            TotalNumber: totalNumber,
            percentSpammer: (valueTotal.TotalSpammer / totalNumber) * 100,
            percentPotential: (valueTotal.TotalPotential / totalNumber) * 100,
            percentUnknow: (valueTotal.TotalUnknow / totalNumber) * 100,
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
    data && (
      <div className="w-full h-[100px] flex flex-row p-[15px] justify-between mt-[20px] rounded-2xl bg-[white]">
        {console.log(data)}
        <div className="text-center">
          <p className="text-[30px] font-bold">
            {formatCompactNumber(data.TotalNumber)}
          </p>
          <p className="text-[20px] font-semibold">Total Number</p>
        </div>
        <div className="text-center">
          <p className="text-[30px] font-bold">
            {formatCompactNumber(data.TotalReport)}
          </p>
          <p className="text-[20px] font-semibold">Total Report</p>
        </div>

        <div className="text-center">
          <p className="text-[30px] font-bold">
            {formatCompactNumber(data.TotalSearch)}
          </p>
          <p className="text-[20px] font-semibold">Total Report</p>
        </div>

        <div className="text-center">
          <p className="text-[30px] font-bold">
            {formatCompactNumber(data.TotalSpammer)}
          </p>
          <p className="text-[20px] font-semibold">Total Spammer</p>
        </div>
      </div>
    )
  );
}

export default DashBoardThongSo;
