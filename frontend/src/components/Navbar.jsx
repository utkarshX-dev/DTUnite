import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SchoolIcon from "@mui/icons-material/School";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BarChartIcon from "@mui/icons-material/BarChart";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerList = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/scholarships">
                    <ListItemIcon>
                        <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary="Scholarships" />
                </ListItem>
                <ListItem button component={Link} to="/results">
                    <ListItemIcon>
                        <AssessmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Results" />
                </ListItem>
                <ListItem button component={Link} to="/placement-stats">
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Placement Stats" />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="static" sx={{ bgcolor: "#fff", color: "#1a1a1b", borderBottom: "1px solid #e5e5e5" }} elevation={0}>
                <Toolbar sx={{ minHeight: 64, display: "flex", alignItems: "center" }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1, color: "#ff4500", mr: 3, fontFamily: "Arial, sans-serif" }}>
                        <Link to="/" style={{ textDecoration: "none", color: "#ff4500" }}>DTUnite</Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        component={Link}
                        to="/create-post"
                        sx={{
                            bgcolor: "#ff4500",
                            color: "#fff",
                            textTransform: "none",
                            fontWeight: 600,
                            borderRadius: 20,
                            px: 2,
                            boxShadow: "none",
                            "&:hover": { bgcolor: "#e03d00" },
                            mr: 2,
                        }}
                    >
                        Create Post
                    </Button>
                    <IconButton color="inherit" component={Link} to="/user">
                        <AccountCircleIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerList}
            </Drawer>
        </>
    );
}

export default Navbar;