import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './test.css';
import './index.css';

import Link from "@mui/material/Link";
  
function App() {
  const [userInfo, setuserInfo] = useState({
    file:[],
    filepreview:null,
   });
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  
  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
      
    });
    
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  const [isSucces, setSuccess] = useState(null);
  const [isSucces1, setSuccess1] = useState(null);
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  const submit = async () => {
    const formdata = new FormData();
    formdata.append("avatar", userInfo.file);

    axios
      .post("http://localhost:3333/imageupload/"+ passmail_id, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
     
      .then((res ) => {
          
        console.warn(res);
      if(res.data.success === 1){
        setSuccess("อัปโหลดรูปภาพสำเร็จ");
        
      }else{
        setSuccess( "กรุณาเลือกรูปภาพก่อนอัปโหลด !!");
        return ;
      }
      })
      .catch((error) => console.log("error", error));
  };
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
        if (result.status === "ok" && result.message.length == 1) {
          var message = result.message[0];
          //alert( JSON.stringify(message) ) ;
          setid_card(message.id_card);
          setmajor(message.major);
          setfaculty(message.faculty);
          setstudy_group(message.study_group);
          setname_passmail(message.name_passmail);
          setimage_student(message.image_student);
          setnew_passmail(message.new_passmail); 
        }
      })
      .catch((error) => console.log("error", error));
  }, [passmail_id]);
  const [id_card, setid_card] = useState("");
  const [major, setmajor] = useState("");
  const [faculty, setfaculty] = useState("");
  const [study_group, setstudy_group] = useState("");
  const [name_passmail, setname_passmail] = useState("");
  const [image_student, setimage_student] = useState("");
  const [new_passmail, setnew_passmail] = useState("");
 
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  
  return (
    <>
       <div className="container mr-60">
        
      <h3 className="text-back">อัปโหลดรูปบัตรนักศึกษาเพื่อยืนยันกับเจ้าหน้าที่</h3>
     
      <div className="formdesign">
      {isSucces  !== null ? <h4> {isSucces} </h4> :null }
      
      
        <div className="form-row">
        {userInfo.filepreview !== null ? 
        <img className="previewimg"  src={userInfo.filepreview} alt="UploadImage" />
      : null}
          <label className="text-back"> เลือกรูปภาพ :</label>
          <input type="file" className="form-control" name="upload_file"  onChange={handleInputChange} />
        </div>
              
        <div className="form-row">
          <button type="submit" className="btn btn-dark" onClick={()=>submit()} > อัปโหลดรูป </button>
          
        </div>
       <Link href="/MainUsers" variant="body2">
        ย้อนกลับ
                </Link> 
      </div>
      
     

    </div>
    </>
  );
}

export default App;
