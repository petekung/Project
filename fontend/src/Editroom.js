import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import Link from "@mui/material/Link";

import TableBody from "@mui/material/TableBody";
export default function Editmanager() {
  const { id_roomname } = useParams();
  
  const handlesubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id_roomname:id_roomname,
      name: name,
      seat: seat,
      number_room: number_room,
    
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3333/Editroom/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        
        if (result["status"] === "ok") {
          alert(result["message"]);
          window.location.href = "/ManageRoom";
        }
      })
      .catch((error) => console.log("error", error));
  };

  const [name, setname] = useState("");
  const [seat, setseat] = useState("");
  const [number_room, setnumber_room] = useState("");
  
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3333/selectroom/"+[id_roomname], requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'ok' && result.message.length == 1) {
          var message = result.message[0];
          //alert( JSON.stringify(message) ) ;
          setname(message.name);
          setseat(message.seat);
          setnumber_room(message.number_room);
         
        }
      })
      .catch((error) => console.log("error", error));
  }, [id_roomname]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom component="div">
          แก้ไขข้อมูลห้อง
        </Typography>

        <form onSubmit={handlesubmit}>
          <TableBody>
            <Grid>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="name"
                    label="ชื่อห้อง "
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setname(e.target.value)}
                    value={name}
                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="seat"
                    label="จำนวนที่นั่ง "
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setseat(e.target.value)}
                    value={seat}
                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="number_room"
                    label="หมายเลขห้อง/ชั้น "
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setnumber_room(e.target.value)}
                    value={number_room}
                  />
                </Grid>
              
                

                
              
              

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>
                    แก้ไขห้อง
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs>
                      <Link href="/ManageRoom" variant="body2">
                        ย้อนกลับ
                      </Link>
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </TableBody>
        </form>
      </Container>
    </React.Fragment>
  );
}
