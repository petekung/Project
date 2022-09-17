import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function SimpleContainer() {
  const passmail = (passmail_id) => {
    window.location = "Staffcompassmail/" + passmail_id;
  };
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3333/repassmail")
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
      });
  }, []);

  const comdelete = (passmail_id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      passmail_id: passmail_id,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3333/deletpassmail", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result["message"]);
        window.location = "MainUsers";
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Box display="flex">
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                รายการขอรหัสผ่านมหาวิทยาลัยราชภัฏเลย
              </Typography>
            </Box>
            <Box></Box>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>รหัสรายการคำขอ</TableCell>
                  <TableCell align="center">รายการคำขอ</TableCell>
                  <TableCell align="center">วันที่ขอรหัสผ่านอีเมล</TableCell>

                  <TableCell align="center">สถานะ</TableCell>
                  <TableCell align="center">จัดการคำขอ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((row) => (
                  <TableRow
                    key={row.passmail_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.passmail_id}
                    </TableCell>{" "}
                    <TableCell align="center">{row.name_passmail}</TableCell>
                    <TableCell align="center">{row.request_date}</TableCell>

                    <TableCell align="center">{row.confirm}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup
                        variant="contained"
                        aria-label="outlined button group"
                      >
                        <Button
                          color="success"
                          onClick={() => passmail(row.passmail_id)}
                        >
                          ตรวจสอบ
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
      
    </React.Fragment>
  );
}
