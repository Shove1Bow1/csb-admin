import React, { useState } from "react";
import "./Cards.css";
import { UilPhone } from "@iconscout/react-unicons";
import Card from "../Card/Card";
import axios from "axios";
import { Fade } from "@mui/material";

const Cards = () => {
  const card = {
    title: "6 months",
    color: {
      backGround: "#008b8b",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 81,
    value: 811,
    png: UilPhone,
    series: [
      {
        name: "Phone",
        data: [31, 40, 28, 51, 42, 109],
      },
    ],
  };
  function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
  }
  const [data, setData] = useState();
  const [chart, setChart] = useState();
  React.useEffect(() => {
    axios
      .get(
        "https://api.call-spam-blocker.xyz/phone-numbers/month/6/year/2023/created",
        {
          headers: { authorization: "spambl0ckerAuthorization2k1rbyp0wer" },
        }
      )
      .then((data) => {
        const res = data.data.result;
        setData({ ...res, value: res.sixMonth.map((value) => value.count) });
      });
  }, []);
  return (
    <div className="Cards" style={{ marginBottom: "10px" }}>
      <Fade in={data ? true : false}>
        <div className="parentContainer">
          {data && (
            <Card
              title={card.title}
              color={card.color}
              barValue={((data.total / data.allNumbers) * 100).toFixed(2)}
              value={data.total}
              png={card.png}
              series={[
                {
                  name: "Phone",
                  data: data.value,
                },
              ]}
            />
          )}
        </div>
      </Fade>
    </div>
  );
};

export default Cards;
