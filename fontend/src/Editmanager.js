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
  const { manager_id } = useParams();
  
  const handlesubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      manager_id: manager_id,
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
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3333/Editmanager/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        
        if (result["status"] === "ok") {
          alert(result["message"]);
          window.location.href = "/MainManager";
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
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3333/selectmanager/" +[manager_id], requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'ok' && result.message.length == 1) {
          var message = result.message[0];
          //alert( JSON.stringify(message) ) ;
          setemail(message.email);
          setpassword(message.password);
          settitle_name(message.title_name);
          setfirstname(message.firstname);
          setlastname(message.lastname);
          setphonenumber(message.phonenumber);
          setjob_position(message.job_position);
          setstatus(message.status);
        }
      })
      .catch((error) => console.log("error", error));
  }, [manager_id]);
console.log(email)
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom component="div">
          แก้ไขข้อมูลผู้บริหาร
        </Typography>

        <form onSubmit={handlesubmit}>
          <TableBody>
            <Grid>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="email"
                    label="อีเมลเจ้าหน้าที่ศูนย์คอมพิวเตอร์ "
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setemail(e.target.value)}
                    value={email}
                  />
                </Grid>
               
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="tiltel_name"
                    label="คำนำหน้าชื่อ "
                    variant="outlined"
                    fullWidth
                    onChange={(e) => settitle_name(e.target.value)}
                    value={title_name}
                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="firstname"
                    label="ชื่อ"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setfirstname(e.target.value)}
                    value={firstname}
                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="lastname"
                    label="นามสกุล"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setlastname(e.target.value)}
                    value={lastname}
                  />
                </Grid>

                <Grid item xs={6} sm={12}>
                  <TextField
                    id="phonenumber"
                    label="เบอร์โทรติดต่อได้"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setphonenumber(e.target.value)}
                    value={phonenumber}
                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="่job_position"
                    label="ตำแหน่งงาน"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setjob_position(e.target.value)}
                    value={job_position}
                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="status"
                    label="สถานะ 1 เปิด 0 ปิด การใช้งาน"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setstatus(e.target.value)}
                    value={status}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>
                    แก้ไขข้อมูลผู้บริหาร
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs>
                      <Link href="/MainManager" variant="body2">
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
