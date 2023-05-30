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
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(
        "https://api.call-spam-blocker.xyz/phone-numbers/spammers/top-ten/recent-reports",
        {
          headers: { authorization: "spambl0ckerAuthorization2k1rbyp0wer" },
        }
      )
      .then((data) => {
        setData(data.data.result);
      });
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
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Phone Number</TableCell>
              <TableCell align="center">Total Reports</TableCell>
              <TableCell align="center">Average Calls</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Unban</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {DataUnbanExample &&
              DataUnbanExample.map((row) => {
                return (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {row.phoneNumber}
                    </TableCell>
                    <TableCell align="center">
                      {row.totalReport}
                    </TableCell>
                    <TableCell align="center">
                      {row.averageCall}
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
                          margin:"0px 5px"
                        }}
                      >
                        Cancel
                      </span>
                      <span
                        className="status"
                        style={{
                          background: "green",
                          color: "white",
                        }}
                      >
                        Unban
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
