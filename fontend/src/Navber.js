import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
export default function Navber() {
  
  const handleLogout = (event) => {
    event.preventDefault();
  
    alert("ออกจากระบบสำเร็จ");
    localStorage.removeItem("token");
    window.location = "/";
    
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ระบบแจ้ง ยืม จองออนไลน์ของสำนักวิทยบริการและเทคโนโลยีสารสนเทศ
          มหาวิทยาลัยราชภัฏเลย
          </Typography>
          <Button variant="contained" color="error" onClick={handleLogout}>
            ออกจากระบบ
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
