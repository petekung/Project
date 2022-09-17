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
import Link from "@mui/material/Link";


export default function SimpleContainer() {
  
  const room_id = room_id =>{
    window.location = '/Noreserve/'+room_id
  }
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3333/fromreserve")
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
      });
  }, []);
 
  
  const No = room_id =>{
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "room_id": room_id
});

var requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:3333/deletpassmail", requestOptions)
  .then(response => response.json())
  .then(result => {
    alert(result['message'])
    window.location = '/MainUsers'
  })
  .catch(error => console.log('error', error));
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Box display="flex">
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
              รายการขอจองห้องศูนย์คอมพิวเตอร์

              </Typography>
            </Box>
            <Box>
            <Box>
            <Link href="/ManageRoom">
              {" "}
              <Button variant="contained">จัดการรายการห้อง</Button>
            </Link>
          </Box>
            </Box>
            
          </Box>
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>รหัสรายการจองห้อง</TableCell>
                  
                  <TableCell align="center">รายการ</TableCell>
                  
                  
                  <TableCell align="center">วันที่ใช้ห้อง</TableCell>
                  <TableCell align="center">เวลาตั้งแต่</TableCell>
                  <TableCell align="center">ถึงเวลา</TableCell>
                  <TableCell align="center">สถานะ</TableCell>
                  <TableCell align="center">อนุมัติ/ไม่อนุมัติ</TableCell>




                  

                  
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((row) => (
                 
                  
                  <TableRow
                  
                    key={row.room_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.room_id}
                    </TableCell>
                    <TableCell align="center">{row.room_name}</TableCell>
                    
                    
                    <TableCell align="center">{row.date_reserve}</TableCell>
                    <TableCell align="center">{row.time_start}</TableCell>
                    <TableCell align="center">{row.time_end}</TableCell>
                    <TableCell align="center">{row.con_firm}</TableCell>

                    
                    <TableCell align="center">
                    <ButtonGroup
                        variant="contained"
                        aria-label="outlined button group"
                      >
                        
                        <Button
                         color="secondary"
                         
                         onClick={() => room_id(row.room_id)}
                        >
                          อนุมัติ/ไม่อนุมัติ
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
