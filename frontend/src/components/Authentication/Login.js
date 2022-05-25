import {
  Stack,
  TextField,
  InputAdornment,
  Button,
  IconButton,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useState } from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material"
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const submitHandler = () => {};

  return (
    <Container>
      <Stack spacing={3}>
        <TextField
          variant="outlined"
          label="Email"
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Password"
          required
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={submitHandler}
          color="primary"
          size="large"
          sx={{ width: "50%", position: "relative", left: "25%" }}
        >
          Login
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;
