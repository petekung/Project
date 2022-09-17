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

export default function CreatUserCom() {
 


  const handlesubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      
      email: email,
      password: password,
      title_name: title_name,
      firstname: firstname,
      lastname: lastname,
      phonenumber: phonenumber,
      job_position:job_position,
      status: status,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3333/registerManager", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result['message'])
        if(result['status']==='ok'){
           window.location.href='/MainManager'
                
        }
      })
      .catch((error) => console.log("error", error));
  };
  
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [title_name, settitle_name] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [job_position, setjob_position] = useState("");
  const [status, setstatus] = useState("");

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom component="div">
          เพิ่มข้อมูลผู้บริหาร
        </Typography>

        <form onSubmit={handlesubmit}>
          <Grid>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={12}>
                <TextField
                  id="email"
                  label="อีเมลผู้บริหาร"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setemail(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={12}>
                <TextField
                  id="password"
                  label="รหัสผ่านผู้บริหาร "
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setpassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    คำนำหน้า
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="title_name"
                    name="title_name"
                    label="คำนำหน้า"
                    onChange={(e) => settitle_name(e.target.value)}
                  >
                    <MenuItem value={"นาย"}>นาย</MenuItem>
                    <MenuItem value={"นาง"}>นาง</MenuItem>
                    <MenuItem value={"นางสาว"}>นางสาว</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={12}>
                <TextField
                  id="firstname"
                  label="ชื่อ"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setfirstname(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={12}>
                <TextField
                  id="lastname"
                  label="นามสกุล"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setlastname(e.target.value)}
                />
              </Grid>

              <Grid item xs={6} sm={12}>
                <TextField
                  id="phonenumber"
                  label="เบอร์โทรติดต่อได้"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setphonenumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={12}>
                <TextField
                  id="job_position"
                  label="ตำแหน่งของผู้บริหาร"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setjob_position(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} sm={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    สถานะใช้งาน
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="status"
                    name="status"
                    label="สถานะใช้งาน"
                    onChange={(e) => setstatus(e.target.value)}
                  >
                    <MenuItem value={"1"}>เปิดใช้งาน</MenuItem>
                    <MenuItem value={"0"}>ปิดใช้งาน</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  เพิ่มสมาชิกผู้บริหาร
                </Button>
                
              </Grid>
              <Grid item xs={6} >
              <Grid container>
                <Grid item xs>
                  <Link href="/Mainmanager" variant="body2">
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
