import React from 'react'
import {ChatState} from "../../Context/ChatProvider"
import { Box } from '@mui/material'
import SingleChat from './SingleChat'
const ChatBox = ({fetchAgain, setFetchAgain}) => {
  const {selectedChat} = ChatState()
  return (
    <Box sx={{
      display: {base: selectedChat ? "flex" : "none", md:"flex"},
      alignItems : "center",
      flexDirection: "column",
      padding: "12px",
      background: "#f2eff1",
      width: {base: "100%", md:"66%"},
      borderRadius: "10px",
      borderWidth: "1px",
    }}>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
    </Box>
  )
}

export default ChatBox