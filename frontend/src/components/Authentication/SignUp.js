import {
  Stack,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Input,
  Typography
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useState } from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material"
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import "../../App.css";
import { styled } from '@mui/material/styles';

const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [showConfirm, setShowConfirm] = useState(false);
  const handleClickShowConfirm = () => setShowConfirm(!showConfirm);
  const handleMouseDownConfirm = () => setShowConfirm(!showConfirm);

  const postDetails = (pics) => {
    
  }
  const submitHandler = () => {};

  const Input = styled('input')({
    display: 'none',
  });

  return (
    <Container className = "signUpConatiner" xs>
      <Stack spacing={2} sx={{marginTop:"6px"}}>
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

        <Input accept="image/*" id="icon-button-file" type="file" onChange={(e) => postDetails(e.target.files[0])}/>
        <IconButton color="primary" aria-label="upload picture" component="span" sx={{border:"solid 1px grey", borderRadius:"5px"}}>
          <PhotoCamera />
          <Typography sx={{marginLeft:"4px"}}>  Profile Picture </Typography>
        </IconButton>
        </label>
        <Button
          variant="contained"
          onClick={submitHandler}
          color="primary"
          size="large"
          sx={{ width: "50%", position: "relative", left: "25%" }}
        >
          Sign Up
        </Button>
      </Stack>
    </Container>
  );
};

export default SignUp;
