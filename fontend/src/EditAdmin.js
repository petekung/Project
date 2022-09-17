import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import Link from "@mui/material/Link";

import TableBody from "@mui/material/TableBody";
export default function Editcom() {
  const { id } = useParams();
  
  const handlesubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: id,
      email: email,
      password: password,
      
      firstname: firstname,
      lastname: lastname,
      phonenumber: phonenumber,
     
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3333/EditAdmin/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        
        if (result["status"] === "ok") {
          alert(result["message"]);
          window.location.href = "/Adminadmin";
        }
      })
      .catch((error) => console.log("error", error));
  };
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3333/selectAdmin/" +[id], requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'ok' && result.message.length == 1) {
          var message = result.message[0];
          //alert( JSON.stringify(message) ) ;
          setemail(message.email);
          setpassword(message.password);
          setfirstname(message.firstname);
          setlastname(message.lastname);
          setphonenumber(message.phonenumber);
          
        }
      })
      .catch((error) => console.log("error", error));
  }, [id]);
console.log(email)
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom component="div">
          แก้ไขข้อมูลผู้ดูแลระบบ
        </Typography>

        <form onSubmit={handlesubmit}>
          <TableBody>
            <Grid>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="email"
                    label="อีเมล ผู้ดูแลระบบ "
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setemail(e.target.value)}
                    value={email}
                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="password"
                    label="รหัสผ่าน ผู้ดูแลระบบ"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setpassword(e.target.value)}
                    value={password}
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
             

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>
                    แก้ไขข้อมูลผู้ดูแลระบบ
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs>
                      <Link href="/Adminadmin" variant="body2">
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
