import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Tablere from './Tablere';
export default function CreatUserCom() {
  const handlesubmit = (event) => {
    const request_date = new Date();
    document.getElementById("demo").innerHTML = request_date;
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const data = new FormData(event.currentTarget);
    var raw = JSON.stringify({
      room_name: room_name,
      room_name: data.get("room_name"),
      detail_reserve: detail_reserve,
      date_reserve: date_reserve,
      time_start: time_start,
      time_end: time_end,
      name_reserve: name_reserve,
      con_firm: con_firm,
      note: note,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3333/fromreseve/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "ok") {
          window.location.href = "/MainUsers";
        }
      })
      .catch((error) => console.log("error", error));
  };
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3333/roomname")
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
      });
  }, []);

  const [room_name, setroom_name] = useState("");
  const [detail_reserve, setdetail_reserve] = useState("");
  const [date_reserve, setdate_reserve] = useState("");
  const [time_start, settime_start] = useState("");
  const [time_end, settime_end] = useState("");
  const [name_reserve, setname_reserve] = useState("เรื่อง จองใช้ห้องคอม");
  const [con_firm, setcon_firm] = useState("กำลังรอ...");
  const [note, setnote] = useState("");

  return (
    <React.Fragment>
      <CssBaseline />
      <div>
        <Tablere/>
      </div>
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom component="div">
          กรุณากรอกข้อมูลให้ครบ
        </Typography>

        <form onSubmit={handlesubmit}>
          <Grid>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={12}>
                <TextField
                  variant="standard"
                  color="warning"
                  focused
                  fullWidth
                  value="เรื่อง จองใช้ห้องคอม"
                  onChange={(e) => setname_reserve(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={12}>
                <TextField
                  type="date"
                  id="demo"
                  required
                  variant="standard"
                  focused
                  fullWidth
                  label="วันที่ใช้ห้อง"
                  onChange={(e) => setdate_reserve(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={12}>
                <TextField
                  id="standard-multiline-static"
                  multiline
                  rows={4}
                 
                  label="แจ้งความประสงค์การจอง/เหตุผลการจอง"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setdetail_reserve(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    รายการห้อง
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="room_name"
                    name="room_name"
                    label="รายการห้อง"
                    required
                    onChange={(e) => setroom_name(e.target.value)}
                  >
                    {items.map((row) => (
                      <MenuItem
                        value={
                          row.name +
                          " " +
                          row.number_room +
                          ":" +
                          row.seat +
                          " ที่นั่ง"
                        }
                        key={row.id_roomname}
                      >
                        {row.name} {row.number_room}:{row.seat} ที่นั่ง
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6} sm={12}>
                <TextField
                  type="time"
                  id="time_start"
                  label="เวลาตั้งแต่"
                  variant="outlined"
                  fullWidth
                  focused
                  required
                  onChange={(e) => settime_start(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={12}>
                <TextField
                  type="time"
                  id="time_start"
                  label="ถึงเวลา"
                  variant="outlined"
                  fullWidth
                  focused
                  required
                  onChange={(e) => settime_end(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="secondary"
                >
                  จอง
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Grid container>
                  <Grid item xs>
                    <Link href="/MainUsers" variant="body2">
                      ย้อนกลับ
                    </Link>
                  </Grid>
                  <Grid item></Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
        
      </Container>
    </React.Fragment>
  );
}
