import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

export default function Creatroom() {
 


  const handlesubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      
      name: name,
      seat: seat,
      number_room: number_room,
      
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3333/creatroom", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result['message'])
        if(result['status']==='ok'){
           window.location.href='/ManageRoom'
                
        }
      })
      .catch((error) => console.log("error", error));
  };
  
  const [name, setname] = useState("");
  const [seat, setseat] = useState("");
  const [number_room, setnumber_room] = useState("");
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom component="div">
          เพิ่มห้อง
        </Typography>

        <form onSubmit={handlesubmit}>
          <Grid>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={12}>
                <TextField
                  id="name"
                  label="ชื่อห้อง"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setname(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={12}>
                <TextField
                  id="number_room"
                  label="หมายเลขห้อง "
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setnumber_room(e.target.value)}
                />
              </Grid>
              
              <Grid item xs={6} sm={12}>
                <TextField
                  id="seat"
                  label="จำนวนที่นั่ง "
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setseat(e.target.value)}
                />
              </Grid>
              
             
             

           
            
              

              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  เพิ่มห้อง
                </Button>
                
              </Grid>
              <Grid item xs={6} >
              <Grid container>
                <Grid item xs>
                  <Link href="/ManageRoom" variant="body2">
                    ย้อนกลับ
                  </Link>
                </Grid>
                <Grid item>
               
                </Grid>
              </Grid>
            </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}
