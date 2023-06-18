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

export default function Contact() {
  const [pageContact, setPageContact] = React.useState(0);

  const rowsPerPage = 5;

  const handleChangePageContact = (event, newPage) => {
    setPageContact(newPage);
  };

  const contact = useSelector((state) => state.notification.contact);
  return (
    <div>
      <div className="Table">
        <h3>Contact</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ maxWidth: "full" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Serial</TableCell>

                <TableCell align="center">Phone Number</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Time</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Reason</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {contact
                ? contact
                    .slice(
                      pageContact * rowsPerPage,
                      pageContact * rowsPerPage + rowsPerPage
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
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">{row.time}</TableCell>

                          <TableCell align="center">{row.email}</TableCell>
                          <TableCell align="center">{row.reson}</TableCell>
                          <TableCell align="center" className="Details">
                            <span
                              className="status"
                              style={{
                                background: "green",
                                color: "white",
                              }}
                              onClick={() => {
                                window.open(
                                  "mailto:" +
                                    row.email +
                                    "?subject=Subject&body=Body%20goes%20here"
                                );
                              }}
                            >
                              Send
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })
                : null}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={contact.length}
            rowsPerPage={rowsPerPage}
            page={pageContact}
            rowsPerPageOptions={[5]}
            onPageChange={handleChangePageContact}
          />
        </TableContainer>
      </div>
    </div>
  );
}
