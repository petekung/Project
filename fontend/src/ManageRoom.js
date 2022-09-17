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
  const Editroom = (id_roomname) => {
    window.location = "/Editroom/" + id_roomname;
  };
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3333/roomname")
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
      });
  }, []);
  const roomdelete = (id_roomname) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id_roomname: id_roomname,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3333/deletroom", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result["message"]);
        window.location = "/ManageRoom"
        
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
                จัดการรายการห้อง
              </Typography>
            </Box>
            <Box>
              <Link href="/MainCom">
                <Button variant="contained" color="success">
                  ย้อนกลับ
                </Button>
              </Link>{" "}
            </Box>
            <Box>
              <Link href="/Creatroom">
                <Button variant="contained">เพิ่มห้อง</Button>
              </Link>{" "}
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  
                  <TableCell align="center">ชื่อห้อง</TableCell>

                  <TableCell align="center">หมายเลขห้อง</TableCell>
                  <TableCell align="center">ที่นั่ง</TableCell>
                  <TableCell align="center">จัดการห้อง</TableCell>

                  

                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    
                    <TableCell align="center">{row.name}</TableCell>

                    <TableCell align="center">{row.number_room}</TableCell>
                    <TableCell align="center">{row.seat}</TableCell>
                    

                    <TableCell align="center">
                      <ButtonGroup
                        variant="outlined"
                        aria-label="outlined button group"
                      >
                        <Button onClick={() => Editroom(row.id_roomname)}>
                          แก้ไขข้อมูลห้อง
                        </Button>
                        <Button color="error" onClick={() => roomdelete(row.id_roomname)}>
                          ลบห้อง
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
