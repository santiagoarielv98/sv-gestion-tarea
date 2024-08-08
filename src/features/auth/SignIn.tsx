import * as React from "react";

import { useLoginMutation } from "@/app/services/auth";

import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { demoCredentials } from "@/constants/credentials";
import LockOutlinedIcon from "@ant-design/icons/LockOutlined";
import SignInForm from "./components/SignInForm";

export default function SignInPage() {
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;
    const data = new FormData(event.currentTarget);
    const credentials = {
      email: data.get("email") as string,
      password: data.get("password") as string,
    };

    await login({ email: credentials.email, password: credentials.password });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          bgcolor: "primary.main",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Alert severity="info">
            You can sign in with email <strong>{demoCredentials.email}</strong>{" "}
            and password <strong>{demoCredentials.password}</strong>.
          </Alert>
          <SignInForm onSubmit={handleSubmit} isLoading={isLoading} />
        </Box>
      </Grid>
    </Grid>
  );
}
