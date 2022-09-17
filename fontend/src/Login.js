import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams } from "react-router-dom";
function Copyright(props) {
  const login = (id) => {
    window.location = "/MainUsers/" + id;
  };
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


const theme = createTheme();

export default function SignInSide() {
  
  
  const handleSubmit = (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData ={
      email: data.get("email"),
      password: data.get("password"),
    }
    fetch('http://localhost:3333/login', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.status==='ok'){
          window.location ='/MainUsers'
          alert('เข้าสู่ระบบสำเร็จ')
        }else{
            alert('รหัสผ่านหรือออีเมลไม่ถูกต้อง')
        }
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: "url(https://image.makewebeasy.net/makeweb/0/vkuWTlvrm/222/B.jpg?v=202009251017)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              เข้าสู่ระบบสำหรับผู้ใช้ทั่วไป
            </Typography>
            
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="อีเมลมหาวิทยาลัย  "
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="รหัสผ่าน"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                เข้าสู่ระบบสำหรับผู้ใช้ทั่วไป
              </Button>
              
              <Button
              
                fullWidth
                variant="outlined"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
                
              > <Link href="/Com" variant="body2">
              {"เข้าสู่ระบบสำหรับเจ้าหน้าที่ศูนย์คอมพิวเตอร์"}
            </Link>
                
              </Button>
              <Button
               
                fullWidth
                variant="outlined"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
              >
               <Link href="/Tech" variant="body2">
              {"เข้าสู่ระบบสำหรับเจ้าหน้าที่ศูนย์เทคโนโลยี"}
            </Link>
              </Button>
              <Button
               
               fullWidth
               variant="outlined"
               color="secondary"
               sx={{ mt: 3, mb: 2 }}
             >
              <Link href="" variant="body2">
             {"เข้าสู่ระบบสำหรับผู้บริหาร"}
           </Link>
             </Button>
              <Grid container>
                <Grid item xs>
                <Link href="/LoginAdmin" variant="body2">
             {"เข้าสู่ระบบสำหรับแอดมิน"}
           </Link>
                </Grid>
                <Grid item>
                  <Link href="/Register" variant="body2">
                    {"สมัครสมาชิกเพื่อเข้าใช้งาน"}
                  </Link>
                </Grid>
                
              </Grid>
              
            </Box>
         
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
