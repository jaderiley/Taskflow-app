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
      bgcolor: "transparent",
      color: "#fff",
      pt: 8,
      position: "fixed",
      left: 0,
      top: 0,
      borderRight: "1px solid #3a2e4d",
      background: "linear-gradient(135deg, #231933 60%, #9446c9 100%)", // Gradient
      boxShadow: "4px 0 16px 0 rgba(148,70,201,0.12)", // Subtle right shadow
      zIndex: 1200,
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