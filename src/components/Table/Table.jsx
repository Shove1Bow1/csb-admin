import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import axios from "axios";
import dayjs from "dayjs";
import { DataUnbanExample } from "../../Data/Data";
import { cancelAnUnban, getListUnban, unbanANumber } from "../../axios/unban.axios";

function createData(phoneNumber, Id, date) {
  return { phoneNumber, Id, date };
}

const rows = [
  createData("Lasania Chiken Fri", 18908424, "2 March 2022", "Approved"),
  createData("Big Baza Bang ", 18908424, "2 March 2022", "Pending"),
  createData("Mouth Freshner", 18908424, "2 March 2022", "Approved"),
  createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
];

const makeStyle = (status) => {
  if (status === "Approved") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "Pending") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
    };
  }
};

export default function BasicTable() {
  const [data, setData] = React.useState();
  async function acceptUnban(phoneNumber){
    const newArray=data;
    const resultUnban=await unbanANumber(phoneNumber);
    if(resultUnban)
      setData(newArray.filter((phoneInfo)=>{return phoneInfo.phoneNumber!==phoneNumber;}))
  }
  async function cancelUnban(phoneNumber){
    const newArray=data;
    const resultCancelAnUnban=await cancelAnUnban(phoneNumber);
    if(resultCancelAnUnban){
      setData(newArray.filter((phoneInfo)=>{return phoneInfo.phoneNumber!==phoneNumber;}))
    }
  }
  React.useEffect(() => {
    async function getListUnbanFrom() {
      setData(await getListUnban());
    }
    getListUnbanFrom();
  }, []);
  return (
    <div className="Table">
      <h3>List of request for unban</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ maxWidth: "full" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="center">Phone Number</TableCell>
              <TableCell align="center">Total Reports</TableCell>
              <TableCell align="center">Average Calls</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Unban</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {data ?
              data.map((row) => {
                return (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row._id}</TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {row.phoneNumber}
                    </TableCell>
                    <TableCell align="center">
                      {row.totalReport}
                    </TableCell>
                    <TableCell align="center">
                      {row.averageCall ? row.averageCall : 0}
                    </TableCell>
                    <TableCell align="center">
                      <span
                        className="status"
                        style={{
                          background: "#ffadad8f",
                          color: "red",
                        }}
                      >
                        Spammer
                      </span>
                    </TableCell>
                    <TableCell align="center" className="Details">
                      <span
                        className="status"
                        style={{
                          background: "red",
                          color: "white",
                          margin: "0px 5px"
                        }}
                        onClick={()=>{cancelUnban(row.phoneNumber)}}
                      >
                        Cancel
                      </span>
                      <span
                        className="status"
                        style={{
                          background: "green",
                          color: "white",
                        }}
                        onClick={()=>{acceptUnban(row.phoneNumber)}}
                      >
                        Unban
                      </span>
                    </TableCell>
                  </TableRow>
                );
              }) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
