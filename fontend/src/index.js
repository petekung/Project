import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from './Login.js';
import Register from './Register.js';
import MainUsers from './MainUsers.js';
import Admin from './Admin'
import Com from './LoginStaffCom'
import Tech from './LoginStaffTech'
import MainCom from './MainStaffCom'
import MainTech from './MainStaffTech'
import LoginAdmin from './LoginAdmin'
import Adminstaffcom from './Adminstaffcom'
import Adminstafftech from './Adminstafftech'
import Adminadmin from './Adminadmin'
import Creatcom from './Creatcom.js'
import Creatadmin from './Creatadmin'
import Creattech from './Creattech'
import Creatmanager from './Creatmanager'
import Editcom from './Editcom.js'
import Edittech from './Edittech'
import EditUsers from './EditUsers'
import EditAdmin from './EditAdmin'
import AdminUsers from './AdminUsers'
import UsersCom from './UsersCom'
import Repassmail from './Repassmail'
import MainManager from './MainManager'
import Editmanager from './Editmanager'
import Staffcompassmail from './Staffcompassmail'
import Reserveusers from './Reserveusers'
import Noreserve from './allowreserve'
import Resevedd from './Resevedd'
import Mainmanageroom from './Mainmanageroom'
import Editroom from './Editroom'
import Creatroom from './Creatroom'
import Uploadnpm from './Uploadnpm'








import * as ReactDOM from 'react-dom/client';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);




root.render(
  <BrowserRouter>
  <Routes>
  <Route path ="/" element={< Login />} />
  <Route path ="/Uploadnpm/:passmail_id" element={< Uploadnpm />} />
  <Route path ="/ManageRoom" element={< Mainmanageroom />} />
  <Route path ="/Creatroom" element={< Creatroom />} />
    <Route path ="/Editroom/:id_roomname" element={< Editroom />} />
  <Route path ="/Resevedd" element={< Resevedd />} />
  <Route path ="/Noreserve/:room_id" element={< Noreserve />} />
  <Route path ="/reserveusers" element={< Reserveusers />} />
  <Route path ="/Staffcompassmail/:passmail_id" element={< Staffcompassmail />} />
  <Route path ="/Editmanager:manager_id" element={< Editmanager />} />
  <Route path ="/Creatmanager" element={< Creatmanager />} />
  <Route path ="/login" element={< Login />} />
  <Route path ="/Register" element={< Register />} />
  <Route path ="/MainUsers" element={< MainUsers />} />
  <Route path ="/Admin" element={< Admin />} />
  <Route path ="/Com" element={< Com />} />
  <Route path ="/Tech" element={< Tech />} />
  <Route path ="/MainCom" element={< MainCom />} />
  <Route path ="/MainTech" element={< MainTech />} />
  <Route path ="/LoginAdmin" element={< LoginAdmin />} />
  <Route path ="/adminstaffcom" element={< Adminstaffcom />} />
  <Route path ="/Adminstafftech" element={< Adminstafftech />} />
  <Route path ="/Adminadmin" element={< Adminadmin />} />
  <Route path ="/creatcom" element={< Creatcom />} />
  <Route path ="/creatadmin" element={< Creatadmin />} />
  <Route path ="/creattech" element={< Creattech />} />
  <Route path ="/Editcom/:staff_id" element={< Editcom />} />
  <Route path ="/EditUsers/:id" element={< EditUsers />} />
  <Route path ="/Edittech/:staff_id" element={< Edittech />} />
  <Route path ="/EditAdmin/:id" element={< EditAdmin />} />
  <Route path ="AdminUsers" element={< AdminUsers />} />
  <Route path ="UsersCom" element={< UsersCom />} />
  <Route path ="MainManager" element={< MainManager />} />
  <Route path ="Repassmail" element={< Repassmail />} />
  



 


 </Routes>
    
  </BrowserRouter>,

);
reportWebVitals();
