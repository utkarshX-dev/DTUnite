import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Button,
  useMediaQuery

} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import logo from "/logo.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BarChartIcon from "@mui/icons-material/BarChart";
import AddIcon from "@mui/icons-material/Add";
import FeedbackIcon from "@mui/icons-material/Feedback";
import GroupsIcon from "@mui/icons-material/Groups";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import Avatar from "@mui/material/Avatar";
import SearchIcon from '@mui/icons-material/Search'

import { UserContext } from "./contexts/userContext.jsx"; 

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  
  const { user } = useContext(UserContext);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const listItemStyle = {
    borderRadius: 2,
    fontWeight: 600,
    color: "#1a1a1b",
    mb: 0.5,
    pl: 2,
    transition: "all 0.22s cubic-bezier(.4,2,.6,1)",
    "&:hover": {
      bgcolor: "#fff5f0",
      color: "#ff4500",
      boxShadow: "0 2px 12px 0 rgba(255,69,0,0.10)",
    },
    "& .MuiListItemIcon-root": {
      color: "inherit",
    },
  };

  const drawerList = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        {isMobile && (
          <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
            <Button
              variant="outlined"
              component={Link}
              to="/explore"
              sx={{
                bgcolor: "#fff",
                color: "#ff4500",
                border: "2px solid #ff4500",
                textTransform: "none",
                fontWeight: 700,
                borderRadius: 20,
                px: 2,
                "&:hover": {
                  bgcolor: "#ff4500",
                  color: "#fff",
                  border: "2px solid #ff4500",
                },
              }}
              onClick={toggleDrawer(false)}
            >
              Explore
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              component={Link}
              to="/create"
              sx={{
                bgcolor: "#ff4500",
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: 20,
                px: 2,
                "&:hover": { bgcolor: "#e03d00" },
              }}
              onClick={toggleDrawer(false)}
            >
              Create Post
            </Button>
          </Box>
        )}

        <List>
          <ListItem button component={Link} to="/" sx={listItemStyle} onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/scholarships" sx={listItemStyle} onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Scholarships" />
          </ListItem>
          <ListItem button component={Link} to="/results" sx={listItemStyle} onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Results" />
          </ListItem>
          <ListItem button component={Link} to="/placement-stats" sx={listItemStyle} onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Placement Stats" />
          </ListItem>
          <ListItem button component={Link} to="/clubs-societies" sx={listItemStyle} onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="Clubs & Societies" />
          </ListItem>
          <ListItem button component={Link} to="/lost-and-found" sx={listItemStyle} onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Lost and found" />
          </ListItem>
          <ListItem button component={Link} to="/feedback" sx={listItemStyle} onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <FeedbackIcon />
            </ListItemIcon>
            <ListItemText primary="Feedback" />
          </ListItem>
          <ListItem button component={Link} to="/faqs" sx={listItemStyle} onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <LiveHelpIcon />
            </ListItemIcon>
            <ListItemText primary="FAQs" />
          </ListItem>
        </List>
      </Box>

      <Box
        sx={{
          textAlign: "center",
          py: 2,
          borderTop: "1px solid #eee",
          bgcolor: "#fff",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} DTUnite. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );


  let avatarSrc = null;
  if (user && user.avatar && user.avatar.startsWith("/avatars/")) {
    avatarSrc = user.avatar;
  }

  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: "#fff",
          color: "#1a1a1b",
          borderBottom: "1px solid #e5e5e5",
        }}
        elevation={0}
      >
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
          <Box sx={{ display: "flex", alignItems: "center", mr: 3 }}>
            <Link to="/" style={{ textDecoration: "none", color: "#ff4500", display: "flex", alignItems: "center" }}>
              <img src={logo} alt="DTUnite Logo" style={{ height: 50, width: 50, marginRight: 8 }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  letterSpacing: 1,
                  color: "#ff4500",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                DTUnite
              </Typography>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          {!isMobile && (
            <>
              <Button
                variant="outlined"
                component={Link}
                to="/explore"
                sx={{
                  bgcolor: "#fff",
                  color: "#ff4500",
                  border: "2px solid #ff4500",
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: 20,
                  px: 2,
                  mr: 2,
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: "#ff4500",
                    color: "#fff",
                    border: "2px solid #ff4500",
                  },
                }}
              >
                Explore
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                component={Link}
                to="/create"
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
            </>
          )}
          <IconButton color="inherit" component={Link} to="/user" sx={{ ml: 1 }}>
            {avatarSrc ? (
              <Avatar
                src={avatarSrc}
                sx={{ width: 32, height: 32, bgcolor: "#ff4500", fontWeight: 700, fontSize: 18 }}
                alt="User"
              />
            ) : user && user.username ? (
              <Avatar
                sx={{ width: 32, height: 32, bgcolor:"#ff4500", border: "2px solid #fff", fontWeight: 400, fontSize: 18 }}
                alt={user.username}
              >
                {user.username[0].toUpperCase()}
              </Avatar>
            ) : (
              <AccountCircleIcon sx={{ fontSize: 32 }} />
            )}
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