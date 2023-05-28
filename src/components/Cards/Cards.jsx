import React, { useState } from "react";
import "./Cards.css";
import { cardsData } from "../../Data/Data";

import Card from "../Card/Card";
import axios from "axios";

const Cards = () => {
  const [data, setData] = useState();
  React.useEffect(() => {
    axios
      .get(
        "https://api.call-spam-blocker.xyz/phone-numbers/spammers/top-ten/recent-reports",
        {
          headers: { authorization: "spambl0ckerAuthorization2k1rbyp0wer" },
        }
      )
      .then((data) => {
        const count = data.data.result.sixMonth.reduce(
          (a, b) => a.count + b.count
        );
        console.log(count);
      });
  }, []);
  return (
    <div className="Cards">
      {cardsData.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
