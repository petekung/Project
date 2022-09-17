import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import InputLabel from "@mui/material/InputLabel";

import React, { useState,useEffect } from "react";
export default function SimpleContainer() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3333/roomname")
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
      });
  }, []);
  return (
<TableBody>
<InputLabel id="demo-simple-select-label" >
                        รายการห้องที่จองได้ทั้งหมด
                      </InputLabel>
<TableRow
  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
>
  <TableCell align="center">
  <List
    sx={{
      width: "100",
      maxWidth: "100",
      bgcolor: "background.paper",
      position: "relative",
      maxHeight:200,
      textAlign: "center",
      
      "& ul": { padding: 0 },
    }}
    subheader={<li />}
  >
    {items.map((row) => (
      <li key={`section-${row}`}>
        <ul >
          <ListSubheader sx={{ minWidth: 300 ,position: "center"}} aria-label="simple table" ></ListSubheader>
          {[row.name+' '+row.number_room+':'+row.seat+'ที่นั่ง'].map((item) => (
            <ListItem key={`-${row}-${item}`}>
              <ListItemText primary={` ${item}`} />
            </ListItem>
          ))}
        </ul>
      </li>
    ))}
  </List>
  </TableCell>
 
</TableRow>
</TableBody>
 );
}