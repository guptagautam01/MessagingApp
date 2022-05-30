import React from 'react'
import {Box, Container, IconButton, MenuItem, Typography, Menu, Avatar} from "@mui/material"
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal'
import { useHistory } from 'react-router-dom';
const TopBar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [anchorE2, setAnchorE2] = React.useState(null);
    const open2 = Boolean(anchorE2);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick2 = (event) => {
        setAnchorE2(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorE2(null);
    };
    const { user } = ChatState();
    const history = useHistory()
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
    };
  return (

    <Box sx={{
        display:"flex", 
        justifyContent:"space-between",
        alignItems : "center",
        alignContent: "center",
        backgroundColor: "#f2eff188", //color : #f2eff1 transparency : 88 (hexadecimal)
        width:"100%",
        padding:"5px 0 5px 0",
        //border: "5px solid grey",
        }}> 
        <Typography sx={{width:"100%"}} variant="h5" align='center' color="#172544">
        {/* <h3 id="h3" align={"center"} padding={"none"}> */}
          IM App
        {/* </h3> */}
      </Typography>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <NotificationsIcon/>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
         <MenuItem onClick={handleClose}>Profile1</MenuItem>
        <MenuItem onClick={handleClose}>Logout1</MenuItem>
      </Menu>

      <IconButton
        id="basic-button"
        aria-controls={open2 ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open2 ? 'true' : undefined}
        onClick={handleClick2}
        sx={{margin:"0px 20px 0px 0px"}}
      >
        <Avatar src={user.pic} sx={{ width: 30, height: 30}}></Avatar>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorE2}
        open={open2}
        onClose={handleClose2}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <ProfileModal user={user}>
            <MenuItem>Profile</MenuItem>
        </ProfileModal>
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu>
    </Box>
  )
}

export default TopBar