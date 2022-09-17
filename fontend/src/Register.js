import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
function Copyright(props) {
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

export default function SignUp() {
  const [images, setImages] = useState([]);
  const [imageURL, setImageURL] = useState([]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImagesUrls = [];
    images.forEach((image) => newImagesUrls.push(URL.createObjectURL(image)));
    setImageURL(newImagesUrls);
  }, [images]);
  function onImageChang(e) {
    setImages([...e.target.files]);
  }
  const [images2, setImages2] = useState([]);
  const [imageURL2, setImageURL2] = useState([]);
  useEffect(() => {
    if (images2.length < 1) return;
    const newImagesUrls2 = [];
    images2.forEach((image2) =>
      newImagesUrls2.push(URL.createObjectURL(image2))
    );
    setImageURL2(newImagesUrls2);
  }, [images2]);
  function onImageChang2(e) {
    setImages2([...e.target.files]);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({});
    const jsonData = {
      email: data.get("email"),
      password: data.get("password"),
      status_users: data.get("status_users"),
      title_name: data.get("title_name"),
      id_population: data.get("id_population"),
      firstname: data.get("firstname"),
      lastname: data.get("lastname"),
      major: data.get("major"),
      faculty: data.get("faculty"),
      phonenumber: data.get("phonenumber"),
      image_id_card_student: data.get("image_id_card_student"),
      image_id_population: data.get("image_id_population"),
    };
    fetch("http://localhost:3333/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("สมัครสำเร็จ");
          window.location = "/";
        } else {
          alert("สมัครไม่สำเร็จ");
        }
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  console.log(imageURL);
  console.log(images);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            สมัครสมาชิกเพื่อเข้าสู่ระบบ
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <form onSubmitCapture={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    name="email"
                    label="อีเมลล์มหาวิทยาลัย"
                    variant="filled"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="password"
                    label="รหัสผ่าน"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        ระดับผู้ใช้งาน
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="status_users"
                        name="status_users"
                        label="ระดับผู้ใช้งาน"
                        required
                      >
                        <MenuItem value={"นักศึกษา"}>นักศึกษา</MenuItem>
                        <MenuItem value={"อาจารย์"}>อาจารย์</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        คำนำหน้าชื่อ
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="title_name"
                        name="title_name"
                        label="คำนำหน้าชื่อ"
                        required
                      >
                        <MenuItem value={"นาย"}>นาย</MenuItem>
                        <MenuItem value={"นาง"}>นาง</MenuItem>
                        <MenuItem value={"นางสาว"}>นางสาว</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="id_population"
                    label="เลขบัตรประชาชน"
                    name="id_population"
                    autoComplete="email"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="firstname"
                    label="ชื่อ"
                    name="firstname"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastname"
                    label="นามสกุล"
                    name="lastname"
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">คณะ</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="faculty"
                        name="faculty"
                        label="คณะ"
                        required
                      >
                        <MenuItem value={"ครุศาสตร์"}>คณะครุศาสตร์</MenuItem>
                        <MenuItem value={"คณะวิทยาการจัดการ"}>
                          คณะวิทยาการจัดการ
                        </MenuItem>
                        <MenuItem value={"คณะมนุษย์ศาสตรและสังคมศาสตร์"}>
                          คณะมนุษย์ศาสตรและสังคมศาสตร์
                        </MenuItem>
                        <MenuItem value={"คณะวิทยาศาสตร์และเทคโนโลยี"}>
                          คณะวิทยาศาสตร์และเทคโนโลยี
                        </MenuItem>
                        <MenuItem value={"คณะเทคโนโลยีอุตสาหกรรม"}>
                          คณะเทคโนโลยีอุตสาหกรรม
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="major"
                    label="สาขา"
                    name="major"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="facuphonenumberlty"
                    label="เบอร์โทรศัพท์"
                    name="phonenumber"
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Button variant="contained" component="label">
                      อัปรูปบัตรประจำตัวประชาชน
                      <input
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        fullWidth
                        id="image_id_population"
                        name="image_id_population"
                        required
                        onChange={onImageChang}
                      />
                    </Button>
                  </Stack>
                  <br></br>
                  {imageURL.map((imageSRC) => (
                    <img
                      width="200"
                      height="200"
                      id="image_id_population"
                      name="image_id_population"
                      src={imageSRC}
                    />
                  ))}
                </Grid>
                <Grid item xs={6}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Button variant="contained" component="label">
                      อัปรูปบัตรประจำตัวนักศึกษา
                      <input
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        id="image_id_card_student"
                        name="image_id_card_student"
                        required
                        onChange={onImageChang2}
                      />
                    </Button>
                  </Stack>
                  <br></br>
                  {imageURL2.map((imageSRC2) => (
                    <img
                      width="200"
                      height="200"
                      id="image_id_card_student"
                      name="image_id_card_student"
                      required
                      src={imageSRC2}
                    />
                  ))}
                </Grid>
                <Grid item xs={12}></Grid>

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="allowExtraEmails"
                        color="primary"
                        required
                      />
                    }
                    label="ฉันยินยอมให้ข้อมูลเพื่อใช้ในการใช้งานใน
                    ระบบแจ้ง ยืม จองออนไลน์ของสำนักวิทยบริการและเทคโนโลยีสารสนเทศ
                    มหาวิทยาลัยราชภัฏเลย"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2 }}
              >
                สมัครสมาชิก
              </Button>
            </form>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  ย้อนกลับ
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
