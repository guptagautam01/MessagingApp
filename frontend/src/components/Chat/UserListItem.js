import React from 'react'
import { Avatar, Box, Typography } from '@mui/material'
const UserListItem = ({user, handleFunction}) => {
  return (
    <Box onClick={handleFunction} sx={{
        cursor: "pointer",
        background: "#E8E8E8",
        "&:hover":{
            background: "#38B2AC",
            color: "white",
        },
        width: "90%",
        display: "flex",
        alignItems: "center",
        color: "black",
        padding: "12px 8px 12px 8px",
        marginBottom: "8px",
        marginLeft: "8px",
        borderRadius: "5px"
    }}>
        <Avatar src={user.pic}/>
        <Box sx={{paddingLeft: "10px"}}>
            <Typography variant="h6" sx={{fontSize:"15px"}}>{user.name}</Typography>
            <Typography variant="p" sx={{fontSize:"13px"}}><b>Email :</b> {user.email}</Typography>
        </Box>
    </Box>
  )
}

export default UserListItem