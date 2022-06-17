import { Avatar, Tooltip } from '@mui/material'
import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../config/ChatLogics'
import { ChatState } from '../../Context/ChatProvider'
import '../../App.css'
const ScrollableChat = ({messages}) => {
    const {user} = ChatState();
  return (
    <ScrollableFeed className= "feed">
        {messages && messages.map((m,i) => (
            <div style={{display:"flex", alignItems:"left", alignContent:"left"}} key={m._id}>
                {(isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id)) && (
                <Tooltip title={m.sender.name} arrow>
                    <Avatar src={m.sender.pic} style={{marginTop:"7px", marginRight:'4px', width: "24px", height: "24px"}} />
                </Tooltip>
                )}
                <span style={{
                    backgroundColor : `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}`,
                    borderRadius : "20px",
                    padding: "5px 15px",
                    maxWidth : "75%",
                    marginLeft : isSameSenderMargin(messages, m, i, user._id),
                    marginTop : isSameUser (messages, m, i, user._id) ? 3 : 10,
                    border : "0.3px solid black"
                }}>
                    {m.content}
                </span>
            </div>
        ))}
    </ScrollableFeed>
  )
}

export default ScrollableChat