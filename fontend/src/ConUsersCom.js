import Navber from "./Navber";
import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
function App() {
  return (
    <div>
      <Navber />

      <Container maxWidth="s">
        <Typography
          component="h2"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        ></Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          ระบบแจ้ง ยืม จองออนไลน์ของสำนักวิทยบริการและเทคโนโลยีสารสนเทศ
          มหาวิทยาลัยราชภัฏเลย
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Box>
            <Link href="/Repassmail">
              <Button variant="contained">ขอรับรหัสผ่านอีเมลลืใหม่</Button>
            </Link>
          </Box>

          <Box>
            <Link href="/reserveusers">
              {" "}
              <Button variant="contained">จองใช้ห้องคอมพิวเตอร์</Button>
            </Link>
          </Box>
        </Stack>
        <Stack sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center">
          <Box>
            <Link href="/MainUsers" variant="body2">
              ย้อนกลับ
            </Link>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}

export default App;
