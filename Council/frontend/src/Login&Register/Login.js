import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const theme = createTheme();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const exist = localStorage.getItem("User");
    const data = new FormData(event.currentTarget);
    if (exist) {
      localStorage.removeItem("User");
    }

    // console.log("Email: ", data.get("email"));
    // console.log("Password: ", data.get("password"));
    await login(data.get("email"), data.get("password"));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 14,
            marginBottom: 14,
            padding: 3,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "#d8d6d61c",
            boxShadow: 3,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              color="secondary"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              sx={{
                background: "whitesmoke",
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              color="secondary"
              type={showPassword ? "text" : "password"}
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              sx={{
                background: "whitesmoke",
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                />
              }
              label="Show Password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup" variant="body2" className="loginlink">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
            {error && <div className="error">{error}</div>}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
