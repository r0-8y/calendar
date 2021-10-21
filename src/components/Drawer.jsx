import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Toolbar from "@mui/material/Toolbar";
import MyCalendar from "./MyCalendar";
import "../styles/Drawer.css";
import ApiCalendar from "react-google-calendar-api";
import Typography from "@mui/material/Typography";

const drawerWidth = 300;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [newEvent, setNewEvent] = useState({
    start: new Date(),
    end: new Date(),
    summary: "",
  });

  const [openSummary, setOpenSummary] = useState(false);

  const handleCloseSummary = () => {
    setOpenSummary(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    ApiCalendar.onLoad(() => setUser(ApiCalendar.getBasicUserProfile()));
  }, []);

  const drawer = (
    <div className="drawer">
      {user ? (
        <div className="userInfo">
          <Avatar
            alt={user.getId()}
            src={"" + user.getImageUrl()}
            sx={{ width: 170, height: 170 }}
          />
          <Typography variant="h5">{user.getName()}</Typography>
          <Typography variant="subtitle1">{user.getEmail()}</Typography>
        </div>
      ) : null}
      {user ? (
        <IconButton
          color="primary"
          aria-label="log out"
          edge="start"
          onClick={props.onLogout}
          className="logout"
          sx={{
            borderRadius: "0px",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
          }}
        >
          <LogoutIcon sx={{ marginRight: "10px" }} />
          Sign out
        </IconButton>
      ) : null}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        >
          <Toolbar className="toolbar">
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <div className="newEventContainer">
              <Typography color="primary" sx={{ fontSize: "15px" }}>
                {newEvent ? ("" + newEvent.start).split("GMT")[0] : null}
              </Typography>
              <Typography color="primary" sx={{ fontSize: "15px" }}>
                {newEvent ? ("" + newEvent.end).split("GMT")[0] : null}
              </Typography>
            </div>
            <IconButton
              color="primary"
              aria-label="add event"
              edge="start"
              onClick={() => {
                setOpenSummary(true);
              }}
            >
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
            borderWidth: "0px",
          }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar sx={{ height: "5vh" }} />
          <MyCalendar
            newEvent={newEvent}
            openSummary={openSummary}
            closeSummary={handleCloseSummary}
            setNewEvent={setNewEvent}
          />
        </Box>
      </Box>
      );
    </>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
