import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { demoCredentials } from "@/constants/credentials";

interface SignInFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

function SignInForm({ isLoading, onSubmit }: SignInFormProps) {
  return (
    <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        defaultValue={demoCredentials.email}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        defaultValue={demoCredentials.password}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={isLoading}
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
    </Box>
  );
}

export default SignInForm;
