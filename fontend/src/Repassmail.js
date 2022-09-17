import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

export default function CreatUserCom() {
  const d = new Date();
  
     console.log(d);
  const handlesubmit = (event) => {
    
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id_card: id_card,
      major: major,
      faculty: faculty,
      study_group: study_group,
      name_passmail: name_passmail,
      new_passmail:new_passmail,
      request_date:request_date
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3333/requestmail", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "ok") {
          window.location.href = "/MainUsers";
        }
      })
      .catch((error) => console.log("error", error));
  };

  const [id_card, setid_card] = useState("");
  const [major, setmajor] = useState("");
  const [faculty, setfaculty] = useState("");
  const [study_group, setstudy_group] = useState("");
  const [name_passmail, setname_passmail] = useState("เรื่อง ขอรับรหัสผ่านใหม่");
  const [new_passmail, setnew_passmail] = useState("");
  const [request_date, setrequest_date] = useState(d);

console.log(request_date)
  

  return (
    <React.Fragment>
      <CssBaseline />

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
                  
                  value="เรื่อง ขอรับรหัสผ่านใหม่"
                  onChange={(e) => setname_passmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={12}>
                <TextField
                  
                  id="demo"
                  type="text"
                  variant="standard"
                  fullWidth
                  label="วันเวลาที่ขอ"
                  focused
                  required
                  onChange={(e) => setrequest_date(e.target.value)}
                  value={d}
                />
              </Grid>
              <Grid item xs={6} sm={12}>
                <TextField
                  id="id_card"
                  label="เลขประจำตัวนักศึกษา"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setid_card(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={12}>
                <TextField
                  id="major"
                  label=" สาขาที่เรียน"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setmajor(e.target.value)}
                />
              </Grid>

              <Grid item xs={6} sm={12}>
                <TextField
                  id="faculty"
                  label="คณะที่เรียน"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setfaculty(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={12}>
                <TextField
                  id="study_group"
                  label="หมู่เรียน"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setstudy_group(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="secondary"
                >
                  ส่งคำขอ
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
