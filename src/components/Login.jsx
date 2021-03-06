import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ApiCalendar from "react-google-calendar-api";
import GoogleButton from "react-google-button";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Calendar
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login(props) {
  const handleLogin = () => {
    // if the user is already signed in and remembered, then push home instantly
    if (ApiCalendar.sign) {
      props.history.push("/home");
      // else listen when the sign in process is done and then push home
    } else {
      ApiCalendar.handleAuthClick();
      ApiCalendar.listenSign(() => props.history.push("/home"));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 5,
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "rgb(66, 133, 244)" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" marginBottom={2}>
              Welcome to Calendar
            </Typography>
            <GoogleButton onClick={() => handleLogin()} />

            <Copyright sx={{ mt: 3 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
