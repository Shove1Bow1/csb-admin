import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Notification.css";

import { useSelector } from "react-redux";
import { TablePagination } from "@mui/material";

export default function Unban() {
  const rowsPerPage = 5;

  const [pageUnban, setPageUnban] = React.useState(0);

  const handleChangePageUnban = (event, newPage) => {
    setPageUnban(newPage);
  };
  const unban = useSelector((state) => state.unban.value);
  return (
    <div className="Table">
      <h3>Unban List</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ maxWidth: "full" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Serial</TableCell>
              <TableCell align="center">Phone Number</TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Reason</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {unban
              ? unban
                  .slice(
                    pageUnban * rowsPerPage,
                    pageUnban * rowsPerPage + rowsPerPage
                  )
                  .map((row, index) => {
                    return (
                      <TableRow
                        key={index + row.phone}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="left">
                          {index + 1}
                        </TableCell>

                        <TableCell align="center">{row.phone}</TableCell>
                        <TableCell align="center">{row.time}</TableCell>
                        <TableCell align="center">{row.reason}</TableCell>
                      </TableRow>
                    );
                  })
              : null}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={unban.length}
          rowsPerPage={rowsPerPage}
          page={pageUnban}
          rowsPerPageOptions={[5]}
          onPageChange={handleChangePageUnban}
        />
      </TableContainer>
    </div>
  );
}
