import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const Sidebar = ({ lists, selectedList, onSelectList }) => (
  <Box
    sx={{
      width: 220,
      height: "100vh",
      color: "#fff",
      pt: 8,
      position: "fixed",
      left: 0,
      top: 0,
      background: "linear-gradient(250deg, #231933 70%,  #9446c9 30%)",
      borderRight: "1px solid #3a2e4d",
    }}
  >
    <Typography variant="h6" sx={{ px: 2, mb: 2 }}>
      Task Lists
    </Typography>
    <List>
      {lists.map((list) => (
        <ListItem key={list} disablePadding>
          <ListItemButton
            selected={selectedList === list}
            onClick={() => onSelectList(list)}
          >
            <ListItemText primary={list} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

export default Sidebar;