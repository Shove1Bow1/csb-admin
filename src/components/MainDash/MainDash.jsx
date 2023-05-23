import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
import Search from "../Search/Search";
const MainDash = (props) => {
  const { selected } = props;
  return (
    <div className="MainDash">
      {selected === 0 && (
        <div>
          <h1>Dashboard</h1>
          <Cards />
          <Table />
        </div>
      )}
      {selected === 1 && (
        <div>
          <h1>Phone Number</h1>
          <Search />
        </div>
      )}
    </div>
  );
};

export default MainDash;
