import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Link from "@mui/material/Link";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function SimpleContainer() {
  const Editadmin = (id) => {
    window.location = "/EditAdmin/" + id;
  };
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3333/Admin")
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
      });
  }, []);
  const UsersGet = () => [
    fetch("http://localhost:3333/Admin")
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
        UsersGet();
      }),
  ];
  const admindelete = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: id,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3333/deleteadmin", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result["message"]);
        UsersGet();
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
                ???????????????????????????????????????????????????
              </Typography>
            </Box>
            <Box>
              <Link href="/Admin">
                <Button variant="contained" color="success">
                  ????????????????????????
                </Button>
              </Link>{" "}
            </Box>
            <Box>
              <Link href="/creatadmin">
                <Button variant="contained">??????????????????????????????????????????????????????????????????</Button>
              </Link>{" "}
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>?????????????????????????????????????????????</TableCell>
                  <TableCell align="center">???????????????</TableCell>

                  <TableCell align="center">????????????</TableCell>
                  <TableCell align="center">????????????</TableCell>
                  <TableCell align="center">???????????????????????????????????????</TableCell>
                  <TableCell align="center">?????????????????????????????????????????????????????????????????????</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">{row.email}</TableCell>

                    <TableCell align="center">{row.firstname}</TableCell>
                    <TableCell align="center">{row.lastname}</TableCell>
                    <TableCell align="center">{row.phonenumber}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup
                        variant="outlined"
                        aria-label="outlined button group"
                      >
                        <Button onClick={() => Editadmin(row.id)}>
                          ???????????????/????????????????????????
                        </Button>
                        <Button
                          color="error"
                          onClick={() => admindelete(row.id)}
                        >
                          ??????
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
