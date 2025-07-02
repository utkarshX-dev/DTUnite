import React, { useState } from "react";
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

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BarChartIcon from "@mui/icons-material/BarChart";
import AddIcon from "@mui/icons-material/Add";
import FeedbackIcon from "@mui/icons-material/Feedback";
import GroupsIcon from "@mui/icons-material/Groups";

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      // Removed onClick and onKeyDown from here!
    >
      <Box>
        {/* Top Buttons on Mobile */}
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
              to="/create-post"
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

        {/* Menu List */}
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
          <ListItem button component={Link} to="/feedback" sx={listItemStyle} onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <FeedbackIcon />
            </ListItemIcon>
            <ListItemText primary="Feedback" />
          </ListItem>
        </List>
      </Box>

      {/* Footer */}
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
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: 1,
              color: "#ff4500",
              mr: 3,
              fontFamily: "Arial, sans-serif",
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "#ff4500" }}>
              DTUnite
            </Link>
          </Typography>
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
            </>
          )}
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