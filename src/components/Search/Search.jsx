import {
  Autocomplete,
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
import Close from "@iconscout/react-unicons/icons/uil-multiply";

import "./Search.css";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import axios from "axios";
import dayjs from "dayjs";
import { CSVLink } from "react-csv";
import { serverUrl } from "../../constant/server.constant";
import { tokenApp } from "../../constant/server.constant";

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
  const rowsPerPage = 10;

  const [valueStatus, setValueStatus] = useState(3);
  const [showHideModal, setShowHideModal] = React.useState(null);

  const [loading, setLoading] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const fetchData = (value) => {
    setLoading(false);
    if (value === "") value = 0;

    axios
      .get(
        serverUrl+'/phone-numbers/' +
          value +
          "/suggest/" +
          valueStatus,
        {
          headers: { authorization: tokenApp },
        }
      )
      .then((data) => {
        setData(data.data.result);
      });
  };

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
  }, []);
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <TextField
          onChange={(e) => handleInputChange(e.target.value)}
          sx={{
            marginBottom: "15px",
            marginRight: "5px",
            width: "100%",
            background: "white",
          }}
          label="Search for phone number"
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
          <Table sx={{ minWidth: 650, maxHeight: 0 }} aria-label="simple table">
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
                          onClick={() => {
                            setShowHideModal(index + 1);
                          }}
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
    </div>
  );
}
