import React from "react";
import ApiCalendar from "react-google-calendar-api";
import "../styles/Home.css";
import Drawer from "./Drawer";

const Home = (props) => {
  const handleLogout = () => {
    ApiCalendar.handleSignoutClick();
    ApiCalendar.listenSign(() => props.history.push("/login"));
  };

  return (
    <div className="container">
      <Drawer onLogout={handleLogout} />
    </div>
  );
};

export default Home;
