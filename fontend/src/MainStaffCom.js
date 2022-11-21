import Navber from './Navber'
import Tabelcom from './Tablecom'
import Tabelreservecom from './Tablereservecom'
import Typography from "@mui/material/Typography";



function App() {
  return (
    <div >
      
      <Navber/>
      <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          เจ้าหน้าที่ศูนย์คอมพิวเตอร์
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          ระบบแจ้ง ยืม จองออนไลน์ของสำนักวิทยบริการและเทคโนโลยีสารสนเทศ
          มหาวิทยาลัยราชภัฏเลย
        </Typography>
      <Tabelcom/>
      <Tabelreservecom/>


     

    </div>
  );
}

export default App;
