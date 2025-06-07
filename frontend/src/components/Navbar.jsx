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
        background: "#9446c9",
        boxShadow: 1,
        height: 64,
        justifyContent: "center",
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;