import React, { useState, useContext } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormHelperText from "@mui/material/FormHelperText";
import { Routes } from "../config/routes";
import { useNavigate } from "react-router";
import { UserContext, UserContextProps } from "../context/user-context";

const theme = createTheme();

export const LogIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const userContext = useContext<UserContextProps>(UserContext);
  const navigate = useNavigate();

  const setFormState = (
    isLoading: boolean,
    errorMessage: string | undefined
  ) => {
    setIsLoading(isLoading);
    setErrorMessage(errorMessage);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setFormState(true, undefined);
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          (data.get("email") as string) === "got@fan.com" &&
          (data.get("password") as string) === "stark"
        ) {
          resolve({ status: 200 });
        } else {
          reject({ status: 401 });
        }
      }, 1000);
    })
      .then(() => {
        setFormState(false, undefined);
        userContext.user.setValue({ uuid: "new uuid" });
        navigate(Routes.BOOKS);
      })
      .catch(() => {
        setFormState(false, "Incorrect email or password");
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
            />
            {errorMessage && (
              <FormHelperText error>{errorMessage}</FormHelperText>
            )}
            <LoadingButton
              loading={isLoading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
