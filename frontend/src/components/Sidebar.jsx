import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

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
      background: "linear-gradient(180deg, #9446c9 0%, #231933 20%, #231933 100%)",
      boxShadow: "8px 0 32px 0 rgba(148,70,201,0.18), 1px 0 0 0 rgba(255,255,255,0.08)",
      borderRight: "1.5px solid rgba(255,255,255,0.10)",
      zIndex: 1200,
      display: "flex",
      flexDirection: "column",
      backdropFilter: "blur(2px)", // subtle glass effect
    }}
  >
    <Typography
      variant="h6"
      sx={{
        px: 2,
        mb: 2,
        mt: 1,
        letterSpacing: 1,
        fontWeight: 700,
        color: "#fff",
        textShadow: "0 2px 12px rgba(148,70,201,0.18)",
      }}
    >
      Task Lists
    </Typography>
    <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.13)" }} />
    <List sx={{ flex: 1 }}>
      {lists.map((list, idx) => (
        <React.Fragment key={list}>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedList === list}
              onClick={() => onSelectList(list)}
              sx={{
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                background: selectedList === list
                  ? "linear-gradient(90deg, #a259ff 0%, #9446c9 100%)"
                  : "transparent",
                boxShadow: selectedList === list
                  ? "0 2px 8px 0 rgba(148,70,201,0.12)"
                  : "none",
                color: selectedList === list ? "#fff" : "#e0e0e0",
                fontWeight: selectedList === list ? 700 : 500,
                transition: "background 0.2s, box-shadow 0.2s, color 0.2s",
                "&:hover": {
                  background: "rgba(148,70,201,0.13)",
                  color: "#fff",
                },
              }}
            >
              <ListItemText primary={list} />
            </ListItemButton>
          </ListItem>
          {idx < lists.length - 1 && (
            <Divider sx={{ mx: 2, borderColor: "rgba(255,255,255,0.07)" }} />
          )}
        </React.Fragment>
      ))}
    </List>
    <Divider sx={{ mt: 2, mb: 1, borderColor: "rgba(255,255,255,0.10)" }} />
    <Box sx={{ px: 2, pb: 2, opacity: 0.7, fontSize: 13, color: "#b39ddb" }}>
      {/* Optional: Add a subtle footer or version info */}
      TaskFlow &copy; {new Date().getFullYear()}
    </Box>
  </Box>
);

export default Sidebar;