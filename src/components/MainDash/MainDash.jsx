import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
import Search from "../Search/Search";
import NotificationTable from "../Notification/Notification";
import Chart from "../Chart/Chart";
import DashBoardCard from "../DashBoardCard/DashBoardCard";
const MainDash = (props) => {
  const { selected } = props;
  return (
    <div className="MainDash">
      {selected === 0 && (
        <>
          <Cards />
          <DashBoardCard />
          <Chart />
        </>
      )}
      {selected === 1 && <Search />}
      {selected === 2 && <Table />}
      {selected === 3 && <NotificationTable />}
    </div>
  );
};

export default MainDash;
