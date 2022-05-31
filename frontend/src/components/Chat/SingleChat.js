import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import {Avatar, Box, IconButton, Typography, Badge} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getSender, getSenderFull, getSenderPic } from '../../config/ChatLogics';
import ProfileModal from './ProfileModal';
import InfoIcon from '@mui/icons-material/Info';
import UpdateGroupChatModal from './UpdateGroupChatModal'

const SingleChat = ({fetchAgain, setFetchAgain}) => {
    const {user, selectedChat, setSelectedChat} = ChatState()
  return (
      <>
      {selectedChat ? (
          <> 
          <Typography sx={{
              fontSize: {base: "28px", md:"30px"},
              margin: "0px 24px 12px 24px",
              width: "100%",
              display:"flex",
              justifyContent: "space-between",
              alignItems: "center"
          }}>
              <IconButton 
              sx={{display:{base: "flex", md:"none"}}}
              onclick={() => setSelectedChat("")}> 
                <ArrowBackIosIcon />
              </IconButton>

                {!selectedChat.isGroupChat ? (
                    <>
                    {getSender(user, selectedChat.user)}
                    <ProfileModal user={getSenderFull(user, selectedChat.user)}> 
                        <Badge badgeContent={<InfoIcon />}>
                            <Avatar src={getSenderPic(user, selectedChat.user)} sx={{border: "solid 1.5px"}}/>
                        </Badge>
                    </ProfileModal>
                    </>
                ) : (
                    <>
                    {selectedChat.chatName.toUpperCase()}
                    <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                    </>
                )}
          </Typography>

          <Box sx={{
              display: "flex", 
              justifyContent:"flex-end", 
              padding:"12px", 
              background:"#C3C3C3", 
              width:"98%", 
              height:"100%", 
              borderRadius:"10px", 
              overflowY:"hidden"}}
            >
        
          </Box>

          </>
      ) : (
          <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", height:"100%"}}>
              <Typography variant='h6' sx={{color:"#838383"}}>Click on a user to start chatting !</Typography>
          </Box>
      )}
      </>
  )
}

export default SingleChat