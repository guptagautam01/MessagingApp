import React from "react";
import { Container, Stack, Box, Typography, Tab, Tabs } from "@mui/material";
import { margin } from "@mui/system";
import { TabPanel, TabList, TabContext } from "@mui/lab";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "../App.css";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

import useMediaQuery from '@mui/material/useMediaQuery';


const Homepage = () => {
  const [value, setValue] = React.useState("one"); //used in tabs

  const theme = createTheme({
    palette: {
      primary: {
        main: "#115041",
      },
      secondary: {
        main: "#172544",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="md"
        sx={{ height: "80%", marginTop: "5%", borderRadius: "10px" }}
      >
        <Stack direction="row">
          <Box
            sx={{
              width: "45%",
              height: "80vh",
              borderRadius: "10px 0 0 10px",
              backgroundImage: `url(https://mcdn.wallpapersafari.com/medium/81/39/1Vvwua.jpg)`,
              backgroundSize: "cover",
            }}
          ></Box>
          <Box
            sx={{
              width: "55%",
              borderRadius: "0 10px 10px 0px",
              height: "80vh",
              backgroundColor: "#F2EFF1",
            }}
          >
            <TabContext value={value}>
              <TabList
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                textColor="primary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
                centered
              >
                <Tab icon={<LoginIcon />} iconPosition="start" label="LOGIN" value="one" sx={{ width: "40%" }} />
                <Tab icon={<HowToRegIcon />} iconPosition="start" label="SIGN UP" value="two" sx={{ width: "40%" }} />
              </TabList>
              <TabPanel value="one">
                <Login />
              </TabPanel>
              <TabPanel value="two">
                <SignUp />
              </TabPanel>
            </TabContext>
          </Box>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default Homepage;
