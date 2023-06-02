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
          <Cards />
          <Search />
        </div>
      )}
      {selected === 1 && (
        <Table />
      )}
    </div>
  );
};

export default MainDash;
