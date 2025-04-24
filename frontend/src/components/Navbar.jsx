import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <h1 className="navbar-title" onClick={() => navigate("/dashboard")}>
                TaskFlow
            </h1>
            <div className="navbar-links">
                <Link to="/create-task" className="navbar-link">
                    Add Task
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;