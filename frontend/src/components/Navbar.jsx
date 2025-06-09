import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "linear-gradient(90deg, #9446c9 60%, #a259ff 100%)",
        boxShadow: "0 4px 24px 0 rgba(148,70,201,0.10)",
        height: 64,
        justifyContent: "center",
        zIndex: 1300,
        borderBottom: "1.5px solid rgba(255,255,255,0.10)", // <-- Add this line
      }}
    >
      <Toolbar
        sx={{
          minHeight: 64,
          px: 4,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 700,
            fontFamily: "Lato, Arial, sans-serif",
            letterSpacing: 1,
          }}
        >
          TaskFlow
        </Typography>
        <Box>
          <Button
            color="inherit"
            sx={{ fontWeight: 600, textTransform: "none" }}
            onClick={() => navigate("/create-task")}
          >
            Add Task
          </Button>
          <Button
            color="inherit"
            sx={{ fontWeight: 600, textTransform: "none", ml: 2 }}
            onClick={() => navigate("/profile")}
          >
            Profile
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;