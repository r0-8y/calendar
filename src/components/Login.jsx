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
import { GoogleLogin } from "react-google-login";

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
  const onLoginSuccess = (res) => {
    console.log("Login success:", res.profileObj);
    props.history.push("/home");
  };

  const onLoginFailure = (res) => {
    console.log("Login failed:", res);
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
            <GoogleLogin
              theme="dark"
              clientId={
                "390134338599-978f08a9kc3j10uvnk2e1ns40k8p676i.apps.googleusercontent.com"
              }
              buttonText="Sign in with Google"
              onSuccess={onLoginSuccess}
              onFailure={onLoginFailure}
              cookiePolicy={"single_host_origin"}
            />
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
