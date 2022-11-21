import React, { useState, useEffect} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import Link from "@mui/material/Link";
import TableBody from "@mui/material/TableBody";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ButtonGroup from "@mui/material/ButtonGroup"
export default function Editcom() {





 
  const { passmail_id } = useParams();
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "http://localhost:3333/selectpassmail/" + [passmail_id],
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        
        if (result.status === "ok" && result.message.length === 1) {
          var message = result.message[0];
          //alert( JSON.stringify(message) ) ;
          setid_card(message.id_card);
          setmajor(message.major);
          setfaculty(message.faculty);
          setstudy_group(message.study_group);
          setname_passmail(message.name_passmail);
          setimage_student(message.image_student);
          setnew_passmail(message.new_passmail); 
          setitems(result);
          
        }
      })
      .catch((error) => console.log("error", error));
  }, [passmail_id]);
  
  
  const handlesubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      passmail_id: passmail_id,
      id_card: id_card,
      major: major,
      faculty: faculty,
      study_group: study_group,
      name_passmail: name_passmail,
      new_passmail: new_passmail,
      image_student: image_student,
      confirm: confirm,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3333/Staffcompassmail", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "ok") {
          window.location.href = "/MainCom";
        }
      })
      .catch((error) => console.log("error", error));
  };
  const [id_card, setid_card] = useState("");
  const [major, setmajor] = useState("");
  const [faculty, setfaculty] = useState("");
  const [study_group, setstudy_group] = useState("");
  const [name_passmail, setname_passmail] = useState("");
  const [image_student, setimage_student] = useState("");
  const [new_passmail, setnew_passmail] = useState("");
  const [confirm, setconfirm] = useState("เรียบร้อย");

  const [items, setitems] = useState([]);
 



 
 
  

  console.log("ชื่อรูปภาพ :",image_student)
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 8 }}>
        <Typography variant="h6" gutterBottom component="div">
          ข้อมูลคำขอผู้ใช้
        </Typography>
        
        <form onSubmit={handlesubmit}>
          
           
              <Grid container spacing={1}>
              <TableBody>
              <Grid item xs={6} sm={12}>
              
              
                  <Stack direction="row" alignItems="center" spacing={2}>
                    
                   
                    
                  </Stack>
                 
                 
                </Grid>
                </TableBody>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="id_card"
                    label="เลขประจำตัวนักศึกษา"
                    variant="standard"
                    fullWidth
                    disabled
                    onChange={(e) => setid_card(e.target.value)}
                    value={id_card}
                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="faculty"
                    label="คณะ"
                    variant="standard"
                    fullWidth
                    disabled
                    onChange={(e) => setfaculty(e.target.value)}
                    value={faculty}
                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="major"
                    label="สาขาา"
                    variant="standard"
                    fullWidth
                    disabled
                    onChange={(e) => setmajor(e.target.value)}
                    value={major}
                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="study_group"
                    label="หมู่เรียน"
                    variant="standard"
                    fullWidth
                    disabled
                    onChange={(e) => setstudy_group(e.target.value)}
                    value={study_group}
                  />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <TextField
                    id="name_passmail"
                    label="หัวข้อ"
                    variant="standard"
                    fullWidth
                    disabled
                    onChange={(e) => setname_passmail(e.target.value)}
                    value={name_passmail}
                  />
                </Grid>
               

                <Grid item xs={6} sm={12}>
                  <TextField
                    id="new_passmail"
                    label="กรอกรหัสใหม่ให้ผู้ใช้"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={(e) => setnew_passmail(e.target.value)}
                    value={new_passmail}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="ส่งเรียบร้อย"
                        color="primary"
                        required
                        onChange={(e) => setconfirm(e.target.value)}
                      />
                    }
                    label="ยืนยันส่งคำขอให้ผู้ใช้"
                  />
                </Grid>

                <Grid item xs={8}>
                  <Button type="submit" variant="contained" fullWidth>
                    ส่งรหัสใหม่ให้ผู้ใช้
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
            
          
        </form>
      </Container>
    </React.Fragment>
  );
}
