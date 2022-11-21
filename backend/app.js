


var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken"); 
const secret = "Fullstack-Login";
const mysql = require("mysql2");
const fs = require("fs");
const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');       // ฟังชั่นในการอัพรูป
 const path = require('path');
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "project_end",
});
const db = mysql.createConnection({
  user: "root",
  host: "localhost", 
  database: "project_end"
})
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../fontend/src/public_html/', 'uploads'),
  filename: function (req, file, cb) {   
      // null as first argument means no error
      cb(null, Date.now() + '-' + file.originalname )  
  }
})

app.use(express.json());
app.post("/register", jsonParser, function (req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    connection.execute(
      "INSERT INTO  d4_users (email,password,status_users,title_name,id_population,firstname,lastname,major,faculty,phonenumber,image_id_card_student,image_id_population) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        req.body.email,
        hash,
        req.body.status_users,
        req.body.title_name,
        req.body.id_population,
        req.body.firstname,
        req.body.lastname,
        req.body.major,
        req.body.faculty,
        req.body.phonenumber,
        req.body.image_id_card_student,
        req.body.image_id_population,
      ],
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        }
        res.json({ status: "ok" });
      }
    );
  });
});
app.post("/registerManager", jsonParser, function (req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    connection.execute(
      "INSERT INTO  d3_manager (email,password,title_name,firstname,lastname,phonenumber,job_position,status) VALUES (?,?,?,?,?,?,?,?)",
      [
        req.body.email,
        hash,
        req.body.title_name,
        req.body.firstname,
        req.body.lastname,
        req.body.phonenumber,
        req.body.job_position,
        req.body.status,
      ],
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        }
        res.json({ status: "ok", message: "เพิ่มข้อมูลสำเร็จ" });
      }
    );
  });
});
app.post("/creatroom", jsonParser, function (req, res, next) {
  connection.execute(
    "INSERT INTO  d8_room_name (name,seat,number_room) VALUES (?,?,?)",
    [req.body.name, req.body.seat, req.body.number_room],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok", message: "เพิ่มห้องสำเร็จ" });
    }
  );
});
app.post("/registerStaffcom", jsonParser, function (req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    connection.execute(
      "INSERT INTO  d2_staff_com (email,password,title_name,firstname,lastname,phonenumber,status) VALUES (?,?,?,?,?,?,?)",
      [
        req.body.email,
        hash,
        req.body.title_name,
        req.body.firstname,
        req.body.lastname,
        req.body.phonenumber,
        req.body.status,
      ],
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        }
        res.json({ status: "ok", message: "เพิ่มเจ้าหน้าที่สำเร็จ" });
      }
    );
  });
});
app.post("/registerStafftech", jsonParser, function (req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    connection.execute(
      "INSERT INTO  d1_staff_tech (email,password,title_name,firstname,lastname,phonenumber,status) VALUES (?,?,?,?,?,?,?)",
      [
        req.body.email,
        hash,
        req.body.title_name,
        req.body.firstname,
        req.body.lastname,
        req.body.phonenumber,
        req.body.status,
      ],
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        }
        res.json({ status: "ok", message: "เพิ่มเจ้าหน้าที่สำเร็จ" });
      }
    );
  });
});
app.post("/registerAdmin", jsonParser, function (req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    connection.execute(
      "INSERT INTO  d12_admin (email,password,firstname,lastname,phonenumber) VALUES (?,?,?,?,?)",
      [
        req.body.email,
        hash,
        req.body.firstname,
        req.body.lastname,
        req.body.phonenumber,
      ],
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        }
        res.json({ status: "ok", message: "เพิ่มข้อมมูลสำเร็จ" });
      }
    );
  });
});
app.post("/requestmail", jsonParser, function (req, res, next) {
  connection.execute(
    "INSERT INTO  d7_passmail_lru (id_card,major,faculty,study_group,name_passmail,image_student,request_date) VALUES (?,?,?,?,?,?,?)",
    [
      req.body.id_card, 
      req.body.major,
      req.body.faculty,
      req.body.study_group,
      req.body.name_passmail,
      req.body.image_student,

             

      req.body.request_date,
    ],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({
        status: "ok",
        message: "ส่งคำขอสำเร็จ กรุณารอเจ้าหน้าที่ตรวจสอบ",
      });
    }
  );
});
app.post('/imageupload/:passmail_id', async (req, res) => {	
  try {
      // 'avatar' is the name of our file input field in the HTML form

      let upload = multer({ storage: storage}).single('avatar');

      upload(req, res, function(err) {
         // req.file contains information of uploaded file
        // req.body contains information of text fields

          if (!req.file) {
              return res.send('คุณยังไม่ได้เลือกรูปบัตร');
          }
          else if (err instanceof multer.MulterError) {
              return res.send(err);
          }
          else if (err) {
              return res.send(err);
          }


        const image_student = req.file.filename;
        const passmail_id = req.params.passmail_id
        db.query(
          "UPDATE  d7_passmail_lru SET image_student = ? WHERE passmail_id = ?",
          [image_student,passmail_id], 
          (err, result) => {
            if (err) {
              res.json({ status: "error", message: err });
        return;
            } 
            res.json({ success: 1 }) 
          }
        );




      }); 

  }catch (err) {console.log(err)}
})
app.post("/fromreseve", jsonParser, function (req, res, next) {
  connection.execute(
    "INSERT INTO  d5_computer_room (room_name,detail_reserve,date_reserve,time_start,time_end,name_reserve,note,con_firm) VALUES (?,?,?,?,?,?,?,?)",
    [
      req.body.room_name,
      req.body.detail_reserve,
      req.body.date_reserve,
      req.body.time_start,
      req.body.time_end,
      req.body.name_reserve,
      ,
      req.body.note,
      req.body.con_firm,
    ],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({
        status: "ok",
        message: "ส่งคำขอสำเร็จ กรุณารอเจ้าหน้าที่ตรวจสอบ",
      });
    }
  );
});

app.post("/login", jsonParser, function (req, res, next) {
  connection.execute(
    "SELECT * FROM d4_users WHERE email=?",
    [req.body.email],
    function (err, users, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      if (users.length === 0) {
        res.json({ status: "error", message: "NO USERS FOUND" });
        return;
      }
      bcrypt.compare(
        req.body.password,
        users[0].password,
        function (err, isLogin) {
          if (isLogin) {
            res.json({ status: "ok", message: "Login success" });
          } else {
            res.json({ status: "error", message: "Login faild" });
          }
        }
      );
    }
  );
});
app.get("/selectcom/:staff_id", (req, res) => {
  const staff_id = [req.params.staff_id];
  connection.execute(
    "SELECT * FROM d2_staff_com WHERE staff_id=?",
    staff_id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ status: "ok", message: result });
      }
    }
  );
});
app.get("/selecttech/:staff_id", (req, res) => {
  const staff_id = [req.params.staff_id];
  connection.execute(
    "SELECT * FROM d1_staff_tech WHERE staff_id=?",
    staff_id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ status: "ok", message: result });
      }
    }
  );
});
app.get("/selectUsers/:id", (req, res) => {
  const id = [req.params.id];
  connection.execute("SELECT * FROM d4_users WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ status: "ok", message: result });
    }
  });
});
app.get("/Noreserve/:room_id", (req, res) => {
  const room_id = [req.params.room_id];
  connection.execute(
    "SELECT * FROM d5_computer_room WHERE room_id=?",
    room_id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ status: "ok", message: result });
      }
    }
  );
});
app.get("/selectAdmin/:id", (req, res) => {
  const id = [req.params.id];
  connection.execute(
    "SELECT * FROM d12_admin WHERE id=?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ status: "ok", message: result });
      }
    }
  );
});
app.get("/selectroom/:id_roomname", (req, res) => {
  const id_roomname = [req.params.id_roomname];
  connection.execute(
    "SELECT * FROM d8_room_name WHERE id_roomname=?",
    id_roomname,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ status: "ok", message: result });
      }
    }
  );
});
app.post("/login", jsonParser, function (req, res, next) {
  connection.execute(
    "SELECT * FROM d4_users WHERE email=?",
    [req.body.email],
    function (err, users, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      if (users.length === 0) {
        res.json({ status: "error", message: "NO USERS FOUND" });
        return;
      }
      bcrypt.compare(
        req.body.password,
        users[0].password,
        function (err, isLogin) {
          if (isLogin) {
            res.json({ status: "ok", message: "Login success" });
          } else {
            res.json({ status: "error", message: "Login faild" });
          }
        }
      );
    }
  );
});
app.get("/selectmanager/:manager_id", (req, res) => {
  const manager_id = [req.params.manager_id];
  connection.execute(
    "SELECT * FROM d3_manager WHERE manager_id=?",
    manager_id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ status: "ok", message: result });
      }
    }
  );
});
app.get("/selectpassmail/:passmail_id", (req, res) => {
  const passmail_id = [req.params.passmail_id];
 
  
 
  connection.execute(
    "SELECT * FROM d7_passmail_lru WHERE passmail_id=?",
    passmail_id, 
    
    function(err, result){
     
      if (err) {
        console.log(err);
       
      } else {
        
       
       
        
        res.json({ status: "ok", message: result });
            
  
      }
     

    
    }
    
  );
  
  
});


app.post("/loginStaffcom", jsonParser, function (req, res, next) {
  connection.execute(
    "SELECT * FROM d2_staff_com WHERE email=? AND status='1'",
    [req.body.email],
    function (err, users, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      if (users.length === 0) {
        res.json({ status: "error", message: "NO USERS FOUND" });
        return;
      }
      bcrypt.compare(
        req.body.password,
        users[0].password,
        function (err, isLogin) {
          if (isLogin) {
            res.json({ status: "ok", message: "Login success" });
          } else {
            res.json({ status: "error", message: "Login faild" });
          }
        }
      );
    }
  );
});
app.post("/loginStafftech", jsonParser, function (req, res, next) {
  connection.execute(
    "SELECT * FROM d1_staff_tech WHERE email=? AND status='1'",
    [req.body.email],
    function (err, users, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      if (users.length === 0) {
        res.json({ status: "error", message: "NO USERS FOUND" });
        return;
      }
      bcrypt.compare(
        req.body.password,
        users[0].password,
        function (err, isLogin) {
          if (isLogin) {
            res.json({ status: "ok", message: "Login success" });
          } else {
            res.json({ status: "error", message: "Login faild" });
          }
        }
      );
    }
  );
});

app.post("/loginAdmin", jsonParser, function (req, res, next) {
  connection.execute(
    "SELECT * FROM d12_admin WHERE email=?",
    [req.body.email],
    function (err, users) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      if (users.length === 0) {
        res.json({ status: "error", message: "NO USERS FOUND" });
        return;
      }
      bcrypt.compare(
        req.body.password,
        users[0].password,
        function (err, isLogin) {
          if (isLogin) {
            res.json({ status: "ok", message: "Login success" });
          } else {
            res.json({ status: "error", message: "Login faild" });
          }
        }
      );
    }
  );
});
app.get("/staffcom", (req, res) => {
  connection.execute("SELECT * FROM d2_staff_com", (err, result) => {
    [req.body.staff_id];
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/repassmail", (req, res) => {
  connection.execute(
    "SELECT * FROM d7_passmail_lru ORDER BY passmail_id DESC",
    (err, result) => {
      [req.body.id];
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.get("/repassmailusers", (req, res) => {
  connection.execute(
    "SELECT * FROM d7_passmail_lru WHERE name_passmail='เรื่อง ขอรับรหัสผ่านใหม่' ORDER BY passmail_id DESC",
    (err, result) => {
      [req.body.id];
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.get("/fromreserve", (req, res) => {
  connection.execute(
    "SELECT * FROM d5_computer_room ORDER BY room_id DESC",
    (err, result) => {
      [req.body.id];
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.get("/fromreservecom", (req, res) => {
  connection.execute(
    "SELECT * FROM d5_computer_room WHERE  ORDER BY room_id DESC",
    (err, result) => {
      [req.body.id];
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.get("/fromreserved", (req, res) => {
  connection.execute(
    "SELECT * FROM d5_computer_room WHERE con_firm	='อนุมัติ'ORDER BY room_id DESC  ",
    (err, result) => {
      [req.body.id];
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.get("/waitreserved", (req, res) => {
  connection.execute(
    "SELECT * FROM d5_computer_room WHERE con_firm	='กำลังรอ...'ORDER BY room_id DESC  ",
    (err, result) => {
      [req.body.id];
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.get("/roomname", (req, res) => {
  connection.execute("SELECT * FROM d8_room_name  ", (err, result) => {
    [req.body.id];
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/Users", (req, res) => {
  connection.execute("SELECT * FROM d4_users", (err, result) => {
    [req.body.id];
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/manager", (req, res) => {
  connection.execute("SELECT * FROM d3_manager", (err, result) => {
    [req.body.manager_id];
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/Editcom/", (req, res) => {
  const staff_id = req.body.staff_id;
  const email = req.body.email;

  const title_name = req.body.title_name;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phonenumber = req.body.phonenumber;
  const status = req.body.status;
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    connection.execute(
      "UPDATE d2_staff_com SET email = ?,title_name = ?,firstname = ?,lastname = ?,phonenumber = ?,status = ? WHERE staff_id = ?",
      [email, title_name, firstname, lastname, phonenumber, status, staff_id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json({ status: "ok", message: "แก้ไขสำเร็จ" });
        }
      }
    );
  });
});
app.put("/allowreserve/", (req, res) => {
  const room_id = req.body.room_id;
  const room_name = req.body.room_name;
  const detail_reserve = req.body.detail_reserve;
  const date_reserve = req.body.date_reserve;
  const time_start = req.body.time_start;
  const time_end = req.body.time_end;
  const name_reserve = req.body.name_reserve;
  const note = req.body.note;
  const con_firm = req.body.con_firm;

  connection.execute(
    "UPDATE d5_computer_room SET room_name = ?,detail_reserve = ?,detail_reserve = ?,date_reserve = ?,time_start = ?,time_end = ?,name_reserve = ? ,note =? ,con_firm=? WHERE room_id = ?",
    [
      room_name,
      detail_reserve,
      detail_reserve,
      date_reserve,
      time_start,
      time_end,
      name_reserve,
      note,
      con_firm,
      room_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ status: "ok", message: "ส่งสำเร็จ" });
      }
    }
  );
});
app.put("/Editroom/", (req, res) => {
  const id_roomname = req.body.id_roomname;
  const name = req.body.name;
  const seat = req.body.seat;
  const number_room = req.body.number_room;

  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    connection.execute(
      "UPDATE d8_room_name SET name = ?,seat = ?,number_room = ? WHERE id_roomname = ?",
      [name, seat, number_room, id_roomname],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json({ status: "ok", message: "แก้ไขสำเร็จ" });
        }
      }
    );
  });
});
app.put("/Staffcompassmail", (req, res) => {
  const passmail_id = req.body.passmail_id;
  const id_card = req.body.id_card;
  const major = req.body.major;
  const faculty = req.body.faculty;
  const study_group = req.body.study_group;
  const name_passmail = req.body.name_passmail;
  const new_passmail = req.body.new_passmail;
  const confirm = req.body.confirm;

  connection.execute(
    "UPDATE d7_passmail_lru SET id_card = ?,major = ?,faculty = ?,study_group = ?,name_passmail = ?,new_passmail = ?,confirm=? WHERE passmail_id = ?",
    [
      id_card,
      major,
      faculty,
      study_group,
      name_passmail,
      new_passmail,
      confirm,
      passmail_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ status: "ok", message: "ส่งคำขอรหัสผ่านใหม่สำเร็จ" });
      }
    }
  );
});
app.put("/Editmanager/", (req, res) => {
  const manager_id = req.body.manager_id;
  const email = req.body.email;
  const title_name = req.body.title_name;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phonenumber = req.body.phonenumber;
  const job_position = req.body.job_position;
  const status = req.body.status;

  connection.execute(
    "UPDATE d3_manager SET email = ?,title_name = ?,firstname = ?,lastname = ?,phonenumber = ?,job_position=?,status = ? WHERE manager_id = ?",
    [
      email,
      title_name,
      firstname,
      lastname,
      phonenumber,
      job_position,
      status,
      manager_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ status: "ok", message: "แก้ไขสำเร็จ" });
      }
    }
  );
});
app.put("/Edittech/", (req, res) => {
  const staff_id = req.body.staff_id;
  const email = req.body.email;

  const title_name = req.body.title_name;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phonenumber = req.body.phonenumber;
  const status = req.body.status;

  connection.execute(
    "UPDATE d1_staff_tech SET email = ?,title_name = ?,firstname = ?,lastname = ?,phonenumber = ?,status = ? WHERE staff_id = ?",
    [email, title_name, firstname, lastname, phonenumber, status, staff_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ status: "ok", message: "แก้ไขข้อมูลสำเร็จ" });
      }
    }
  );
});
app.put("/EditAdmin/", (req, res) => {
  const id = req.body.id;
  const email = req.body.email;

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phonenumber = req.body.phonenumber;

  connection.execute(
    "UPDATE d12_admin SET email = ?,firstname = ?,lastname = ?,phonenumber = ? WHERE id = ?",
    [email, firstname, lastname, phonenumber, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ status: "ok", message: "แก้ไขข้อมูลสำเร็จ" });
      }
    }
  );
});

app.put("/Editusers/", (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  const status_users = req.body.status_users;
  const title_name = req.body.title_name;
  const id_population = req.body.id_population;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const major = req.body.major;
  const faculty = req.body.faculty;
  const phonenumber = req.body.phonenumber;

  connection.execute(
    "UPDATE d4_users SET email = ?,status_users=?,title_name = ?,id_population=?,firstname = ?,lastname = ?,major=?,faculty=?,phonenumber = ? WHERE id = ?",
    [
      email,
      status_users,
      title_name,
      id_population,
      firstname,
      lastname,
      major,
      faculty,
      phonenumber,
      id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ status: "ok", message: "แก้ไขข้อมูลสำเร็จ" });
      }
    }
  );
});

app.get("/stafftech", (req, res) => {
  connection.execute("SELECT * FROM d1_staff_tech", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/Admin", (req, res) => {
  connection.execute("SELECT * FROM d12_admin", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.delete("/deletecom", (req, res) => {
  const staff_id = [req.body.staff_id];
  connection.execute(
    "DELETE FROM d2_staff_com WHERE staff_id = ?",
    staff_id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ status: "ok", message: "ลบสำเร็จ" });
      }
    }
  );
});
app.delete("/deleteadmin", (req, res) => {
  const id = [req.body.id];
  connection.execute(
    "DELETE FROM d12_admin WHERE id = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ status: "ok", message: "ลบสำเร็จ" });
      }
    }
  );
});
app.delete("/deletetech", (req, res) => {
  const staff_id = [req.body.staff_id];
  connection.execute(
    "DELETE FROM d1_staff_tech WHERE staff_id = ?",
    staff_id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ status: "ok", message: "ลบสำเร็จ" });
      }
    }
  );
});
app.delete("/deleteusers", (req, res) => {
  const staff_id = [req.body.staff_id];
  connection.execute(
    "DELETE FROM d4_users WHERE id = ?",
    staff_id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ status: "ok", message: "ลบสำเร็จ" });
      }
    }
  );
});
app.delete("/deletemanager", (req, res) => {
  const manager = [req.body.manager_id];
  connection.execute(
    "DELETE FROM d3_manager WHERE manager_id = ?",
    manager,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ status: "ok", message: "ลบสำเร็จ" });
      }
    }
  );
});
app.delete("/deletpassmail", (req, res) => {
  const passmail = [req.body.passmail_id];
  connection.execute(
    "DELETE FROM d7_passmail_lru WHERE passmail_id = ?",
    passmail,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ status: "ok", message: "ลบสำเร็จ" });
      }
    }
  );
});
app.delete("/deletroom", (req, res) => {
  const id_roomname = [req.body.id_roomname];
  connection.execute(
    "DELETE FROM d8_room_name WHERE id_roomname = ?",
    id_roomname,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ status: "ok", message: "ลบสำเร็จ" });
      }
    }
  );
});
app.listen(3333, function () {
  console.log(" online api on port 3333");
});
