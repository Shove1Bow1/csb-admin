import {
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  debounce,
} from "@mui/material";
import React, { useState } from "react";
import Export from "@iconscout/react-unicons/icons/uil-import";

import "./Search.css";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import axios from "axios";
import dayjs from "dayjs";
import { CSVLink } from "react-csv";

const makeStyle = (status) => {
  if (status === "unknown") {
    return {
      width: "100%",
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "spammer") {
    return {
      width: "100%",
      background: "#ffadad8f",
      color: "red",
    };
  } else {
    return {
      width: "100%",
      background: "#59bfff",
      color: "white",
    };
  }
};

export default function Search() {
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 12;

  const [valueStatus, setValueStatus] = useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const fetchData = (value) => {
    if (value === "") value = 0;
    axios
      .get(
        "https://api.call-spam-blocker.xyz/phone-numbers/" +
          value +
          "/suggest/" +
          valueStatus,
        {
          headers: { authorization: "spambl0ckerAuthorization2k1rbyp0wer" },
        }
      )
      .then((data) => {
        setData(data.data.result);
      });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleInputChange = React.useCallback(
    debounce((nextValue) => fetchData(nextValue), 1000),
    []
  );

  const exportData = data.map((item) => ({
    phoneNumber: item.phoneNumber,
    status: item.status,
    report: item.reportList.map(
      (report, index) =>
        " Title: " +
        report.title +
        " Decription: " +
        report.content +
        " Date Report: " +
        dayjs(report.reportDate).format("DD-MM-YYYY").toString()
    ),
  }));

  React.useEffect(() => {
    fetchData(0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h3 style={{ paddingTop: "16px" }}>Phone Numbers</h3>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <TextField
          onChange={(e) => handleInputChange(e.target.value)}
          sx={{
            marginBottom: "15px",
            marginRight: "5px",
            width: "100%",
            background: "white",
          }}
          label="Search a phone number"
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Status"
          defaultValue={3}
          value={valueStatus}
          onChange={(e) => {
            setValueStatus(e.target.value);
          }}
          sx={{ marginBottom: "15px", marginRight: "5px", width: "300px" }}
        >
          <MenuItem value={3}>Both</MenuItem>
          <MenuItem value={4}>Potential-Spammer</MenuItem>
          <MenuItem value={5}>Spammer</MenuItem>
        </Select>
        <CSVLink
          data={exportData}
          style={{ heigth: "200px" }}
          filename="ExportPhoneNumber"
        >
          <Button
            variant="outlined"
            startIcon={<Export />}
            sx={{ marginBottom: "15px", height: "80%" }}
          >
            Export
          </Button>
        </CSVLink>
      </div>

      <div className="Table">
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table
            sx={{ minWidth: 650, maxHeight: 0, height: "100%" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell align="center">Create Date</TableCell>
                <TableCell align="center">Report</TableCell>
                <TableCell align="center">Tracked</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {data &&
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        key={row._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">{row._id}</TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          className="Details"
                        >
                          {row.phoneNumber}
                        </TableCell>
                        <TableCell align="center">
                          {dayjs(row.createAt).format("DD-MM-YYYY").toString()}
                        </TableCell>
                        <TableCell align="center">
                          {row.reportList.length}
                        </TableCell>
                        <TableCell align="center">
                          {row.callTracker.length}
                        </TableCell>
                        <TableCell align="center">
                          <span
                            className="status"
                            style={makeStyle(row.status)}
                          >
                            {row.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        </TableContainer>
      </div>
      {/* {showHideModal && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "rgb(128,128,128,0.5)",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              position: "relative",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              borderRadius: 12,
              width: 400,
              height: 500,
              overflow: "auto",
              backgroundColor: "whitesmoke",
              opacity: 1,
              zIndex: 1,
            }}
          >
            <div
              style={{
                position: "absolute",
                right: 5,
                top: 5,
                cursor: "pointer",
              }}
              onClick={() => setShowHideModal(null)}
            >
              <Close />
            </div>
            <div
              style={{
                textAlign: "center",
              }}
            >
              <p style={{ paddingTop: 15, fontSize: 20, fontWeight: 700 }}>
                Phone Number
                <p style={{ fontSize: 18, fontWeight: 500, lineHeight: 0 }}>
                  {data[showHideModal].phoneNumber}
                </p>
              </p>
              <p style={{ fontSize: 20, fontWeight: 700 }}>
                Status
                <p
                  className="status"
                  style={{
                    ...makeStyle(data[showHideModal - 1].status),
                    marginTop: 5,
                    marginLeft: 50,
                    marginRight: 50,
                  }}
                >
                  {data[showHideModal - 1].status}
                </p>
              </p>
              <p style={{ fontSize: 20, fontWeight: 700 }}>
                Report
                {data[showHideModal - 1].reportList.map((report, index) => (
                  <div
                    key={report._id}
                    style={{
                      marginTop: 5,
                      marginLeft: 50,
                      marginRight: 50,
                    }}
                  >
                    <hr />
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 500,
                        display: "flex",
                        flexFlow: "row",
                      }}
                    >
                      <p
                        style={{
                          width: "35%",
                          textAlign: "left",
                        }}
                      >
                        Title:
                      </p>
                      <p
                        style={{
                          width: "65%",
                          color: "red",
                          textAlign: "left",
                        }}
                      >
                        {report.title}
                      </p>
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 500,
                        display: "flex",
                        flexFlow: "row",
                      }}
                    >
                      <p
                        style={{
                          textAlign: "left",
                        }}
                      >
                        Decription:
                      </p>
                      <p
                        style={{
                          color: "red",
                          textAlign: "left",
                        }}
                      >
                        {report.content}
                      </p>
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 500,
                        display: "flex",
                        flexFlow: "row",
                      }}
                    >
                      <span
                        style={{
                          width: "35%",
                          textAlign: "left",
                        }}
                      >
                        Date:
                      </span>
                      <p
                        style={{
                          width: "65%",
                          color: "red",
                          textAlign: "left",
                        }}
                      >
                        {dayjs(report.reportDate)
                          .format("DD-MM-YYYY")
                          .toString()}
                      </p>
                    </div>
                  </div>
                ))}
              </p>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
