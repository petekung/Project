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
export default function EditUsers() {
  
  const { id } = useParams();
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    

    fetch("http://localhost:3333/selectusers/"+[id], requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'ok' && result.message.length == 1) {
          var message = result.message[0];
          //alert( JSON.stringify(message) ) ;
          setemail(message.email);
          setpassword(message.password);
          setstatus_users(message.status_users);
          settitle_name(message.title_name);
          setid_population(message.id_population);
          setfirstname(message.firstname);
          setlastname(message.lastname);
          setmajor(message.major);
          setfaculty(message.faculty);
          setphonenumber(message.phonenumber);
          
        }
      })
      .catch((error) => console.log("error", error));
  }, [id]);
  const handlesubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: id,
      email: email,
      password: password,
      status_users: status_users,
      title_name: title_name,
      id_population: id_population,
      firstname: firstname,
      lastname: lastname,
      major: major,
      faculty: faculty,
      phonenumber: phonenumber,
      
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3333/EditUsers/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        
        if (result["status"] === "ok") {
          alert(result['message'])
          window.location.href = "/AdminUsers";
        }
      })
      .catch((error) => console.log("error", error));
  };
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [status_users, setstatus_users] = useState("");
  const [id_population, setid_population] = useState("");
  const [title_name, settitle_name] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [major, setmajor] = useState("");
  const [faculty, setfaculty] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  

  
  console.log(email)
  console.log(title_name)
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom component="div">
          แก้ไขข้อมูลผู้ใช้งาน
        </Typography>

        <form onSubmit={handlesubmit}>
          <TableBody>
            <Grid>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="email"
                    label="อีเมล ผู้ใช้"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setemail(e.target.value)}
                    value = {email}
                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="password"
                    label="รหัสผ่าน ผู้ใช้ "
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setpassword(e.target.value)}
                    value = {password}

                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="stutas_users"
                    label="สถนาะผู้ใช้"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setstatus_users(e.target.value)}
                    value = {status_users}

                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                <TextField
                    id="title_name"
                    label="คำนำหน้าชื่อ"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => settitle_name(e.target.value)}
                    value = {title_name}

                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                <TextField
                    id="id_population"
                    label="เลขประจำตัวประชาชน"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setid_population(e.target.value)}
                    value = {id_population}

                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="firstname"
                    label="ชื่อ"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setfirstname(e.target.value)}
                    value = {firstname}

                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="lastname"
                    label="นามสกุล"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setlastname(e.target.value)}
                    value = {lastname}

                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="major"
                    label="สาขา"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setmajor(e.target.value)}
                    value = {major}

                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="faculty"
                    label="คณะ"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setfaculty(e.target.value)}
                    value = {faculty}

                  />
                </Grid>

                <Grid item xs={6} sm={12}>
                  <TextField
                    id="phonenumber"
                    label="เบอร์โทรติดต่อได้"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setphonenumber(e.target.value)}
                    value = {phonenumber}

                  />
                </Grid>
              
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>
                    แก้ไขข้อมูลผู้ใช้
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs>
                      <Link href="/AdminUsers" variant="body2">
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



