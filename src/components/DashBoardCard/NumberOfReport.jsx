import React, { useState } from "react";
import { dbthongke } from "../../firebase/firebase";
import { onValue, ref } from "firebase/database";
import dayjs from "dayjs";
function NumberOfReport(props) {
  const [numberReport, setNumberReport] = useState();

  const mouth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  React.useEffect(() => {
    const Ref = ref(dbthongke, "Report/" + dayjs().format("1-MM-YYYY"));

    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setNumberReport(data);
      }
    });
  }, []);

  return (
    <div
      style={{
        borderWidth: "1px",
        borderRadius: "12px",
        width: "48%",
        height: "80px",
        textAlign: "center",
        marginTop: "20px",
        marginBottom: "20px",
        backgroundColor: "white",
      }}
    >
      <h3 style={{ fontWeight: "600", color: "#008b8b" }}>
        Total reports in {mouth[dayjs().month()]}
      </h3>
      <p className="text-[40px] font-bold">{numberReport}</p>
    </div>
  );
}

export default NumberOfReport;
