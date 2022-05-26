import {
  Stack,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import "../../App.css";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useHistory } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [showConfirm, setShowConfirm] = useState(false);
  const handleClickShowConfirm = () => setShowConfirm(!showConfirm);
  const handleMouseDownConfirm = () => setShowConfirm(!showConfirm);

  const [snackStatus, setSnackStatus] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const history = useHistory();

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      // <Snackbar
      //   open="true"
      //   autoHideDuration={6000}
      //   onClose ={(event, reason) => {
      //     if (reason === 'clickaway') {
      //       return;
      //     }
      //     setSnackStatus(false);
      //   }}
      //   message="Please select an image"
      //   //action={action}
      // />
      setSnackMessage("Please select an image");
      setSnackStatus(true);
      setLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "mern-chat-app");
      data.append("cloud_name", "gautamg");
      fetch("https://api.cloudinary.com/v1_1/gautamg/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      // <Snackbar
      //   open="true"
      //   autoHideDuration={6000}
      //   //onClose={handleClose}
      //   message="Please select an image"
      //   //action={action}
      // />
      setSnackMessage("Please select an image");
      setSnackStatus(true);
      setLoading(false);
      return;
    }
  };
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      // <Snackbar
      //   open="true"
      //   autoHideDuration={6000}
      //   //onClose={handleClose}
      //   message="Please fill all the fields"
      //   //action={action}
      // />
      setSnackMessage("Please fill all the fields");
      setSnackStatus(true);
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      setSnackStatus(true);
      setSnackMessage("Passwords do not match!");
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
        "/api/user",
        { name, email, password, pic },
        config
      );
      // <Snackbar
      //   open="true"
      //   autoHideDuration={6000}
      //   //onClose={handleClose}
      //   message="Succesful Registeration!"
      //   //action={action}
      // />

      setSnackMessage("Succesful Registeration!");
      setSnackStatus(true);

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);

      history.push("/chat");
    } catch (error) {
      // <Snackbar
      //   open="true"
      //   autoHideDuration={6000}
      //   //onClose={handleClose}
      //   message="Error Encountered!"
      //   //action={action}
      // />

      setSnackMessage(error.response.data.message);
      setSnackStatus(true);

      console.log(error);
      setLoading(false);
    }
  };

  const Input = styled("input")({
    display: "none",
  });

  return (
    <Container className="signUpConatiner" xs>
      <Stack spacing={2} sx={{ marginTop: "6px" }}>
        <TextField
          variant="outlined"
          label="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />
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
        <TextField
          variant="outlined"
          label="Confirm Password"
          required
          type={showConfirm ? "text" : "password"}
          onChange={(e) => setConfirmpassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirm}
                  onMouseDown={handleMouseDownConfirm}
                >
                  {showConfirm ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <label htmlFor="icon-button-file">
          <Input
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={(e) => postDetails(e.target.files[0])}
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            sx={{ border: "solid 1px grey", borderRadius: "5px" }}
          >
            <PhotoCamera />
            <Typography sx={{ marginLeft: "4px" }}>
              {" "}
              Profile Picture{" "}
            </Typography>
          </IconButton>
        </label>
        <Button
          variant="contained"
          onClick={submitHandler}
          color="primary"
          size="large"
          sx={{ width: "50%", position: "relative", left: "25%" }}
          disabled={loading ? true : false}
        >
          Sign Up
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

export default SignUp;
