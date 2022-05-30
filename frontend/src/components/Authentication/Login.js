import {
  Stack,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Snackbar,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useHistory } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [snackStatus, setSnackStatus] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const history = useHistory();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      setSnackMessage("Please fill all the fields!");
      setSnackStatus(true);
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "api/user/login",
        { email, password },
        config
      );

      setSnackMessage("Login Successful !");
      setSnackStatus(true);

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      setSnackMessage(error.response.data.message);
      setSnackStatus(true);
      setLoading(false);
    }
  };
  const refreshPage =async() => {
    window.location.reload(false);
  };
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
          disabled={loading ? true : false}
        >
          Login
        </Button>
      </Stack>
      <Snackbar
        open={snackStatus}
        autoHideDuration={6000}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setSnackStatus(false);
        }}
        message={snackMessage}
        action={
          <IconButton
            color="inherit"
            onClick={(event, reason) => {
              if (reason === "clickaway") {
                return;
              }
              setSnackStatus(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </Container>
  );
};

export default Login;
