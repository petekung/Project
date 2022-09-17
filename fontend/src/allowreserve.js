import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import Link from "@mui/material/Link";
import Axios from "axios";
import TableBody from "@mui/material/TableBody";
export default function Editcom() {
  
  const { room_id } = useParams();
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    

    fetch("http://localhost:3333/Noreserve/"+[room_id], requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'ok' && result.message.length == 1) {
          var message = result.message[0];
          //alert( JSON.stringify(message) ) ;
          setroom_name(message.room_name);
          setdetail_reserve(message.detail_reserve);
          setdate_reserve(message.date_reserve);
          settime_start(message.time_start);
          settime_end(message.time_end);
          setname_reserve(message.name_reserve);
          setnote(message.note);
          setcon_firm(message.con_firm);

        }
      })
      .catch((error) => console.log("error", error));
  }, [room_id]);
  const handlesubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const data = new FormData(event.currentTarget);

    var raw = JSON.stringify({
      room_id: room_id,
      room_name: room_name,
      detail_reserve: detail_reserve,
      date_reserve: date_reserve,
      time_start: time_start,
      time_end: time_end,
      name_reserve: name_reserve,
      note: note,
      con_firm: data.get("con_firm"),

    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3333/allowreserve/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result['message'])
        if (result["status"] === "ok") {
          window.location.href = "/MainCom";
        }
      })
      .catch((error) => console.log("error", error));
  };
  const [room_name, setroom_name] = useState("");
  const [detail_reserve, setdetail_reserve] = useState("");
  const [date_reserve, setdate_reserve] = useState("");
  const [time_start, settime_start] = useState("");
  const [time_end, settime_end] = useState("");
  const [name_reserve, setname_reserve] = useState("เรื่อง จองใช้ห้องคอม");
  const [note, setnote] = useState("");
  const [con_firm, setcon_firm] = useState("");


  
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom component="div">
          ตรวจสอบข้อมูล
        </Typography>

        <form onSubmit={handlesubmit}>
          <TableBody>
            <Grid>
              <Grid container spacing={2}>
              <Grid item xs={6} sm={12}>
                  <TextField
                    id="name_reserve"
                    label="เรื่อง"
                    focused
                    variant="standard"
                    color="warning"
                    fullWidth
                    onChange={(e) => setname_reserve(e.target.value)}
                    value = {"เรื่อง จองใช้ห้องคอม"}

                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="room_name"
                    label="ชื่อห้องที่จอง"
                    variant="outlined"
                    fullWidth
                    disabled
                    onChange={(e) => setroom_name(e.target.value)}
                    value = {room_name}
                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="detail_reserve"
                    label="รายละเอียดการจอง "
                    variant="outlined"
                    fullWidth
                    disabled
                    onChange={(e) => setdetail_reserve(e.target.value)}
                    value = {detail_reserve}

                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                <TextField
                    id="date_reserve"
                    label="วันที่ต้องการจอง"
                    variant="outlined"
                    fullWidth
                    disabled
                    onChange={(e) => setdate_reserve(e.target.value)}
                    value = {date_reserve}

                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="time_start"
                    label="ตั้งแต่เวลา"
                    variant="outlined"
                    fullWidth
                    disabled
                    onChange={(e) => settime_start(e.target.value)}
                    value = {time_start}

                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="time_end"
                    label="ถึงเวลา"
                    variant="outlined"
                    fullWidth
                    disabled
                    onChange={(e) => settime_end(e.target.value)}
                    value = {time_end}

                  />
                </Grid>

              
                <Grid item xs={6} sm={12}>
                <TextField
                    id="note"
                    label="หมายเหตุ/เหตุผลที่ไม่อนุมัติ"
                    variant="outlined"
                    fullWidth
                    
                    onChange={(e) => setnote(e.target.value)}
                    value={note}
                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        อนุมัติ/ไม่อนุมัติ
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="con_firm"
                        name="con_firm"
                        label="อนุมัติ/ไม่อนุมัติ"
                        required
                      >
                        <MenuItem value={"อนุมัติ"}>อนุมัติ</MenuItem>
                        <MenuItem value={"ไม่อนุมัติ"}>ไม่อนุมัติ</MenuItem>
                       
                      </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>
                    ส่ง
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs>
                      <Link href="/MainCom" variant="body2">
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



