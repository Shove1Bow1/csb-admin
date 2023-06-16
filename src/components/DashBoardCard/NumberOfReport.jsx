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
      console.log(data);
      if (data) {
        setNumberReport(data);
      } else {
        console.log("not data");
      }
    });
  }, []);

  return (
    <div
      style={{
        borderWidth: "1px",
        borderRadius: "12px",
        width: "500px",
        height: "100px",
        textAlign: "center",
        marginTop: "20px",
        marginBottom: "20px",
        backgroundColor: "white",
      }}
    >
      <h3 style={{ fontWeight: "600", color: "#008b8b" }}>
        Number Report in {mouth[dayjs().month()]}
      </h3>
      <h2>{numberReport}</h2>
    </div>
  );
}

export default NumberOfReport;
