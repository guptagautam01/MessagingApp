import React, { useState, useEffect } from "react";
import { ChatState } from "../../Context/ChatProvider";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Badge,
  TextField,
  FormControl,
  Input,
  InputAdornment,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  getSender,
  getSenderFull,
  getSenderPic,
} from "../../config/ChatLogics";
import ProfileModal from "./ProfileModal";
import InfoIcon from "@mui/icons-material/Info";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import axios from "axios";
import SendSharp from "@mui/icons-material/SendSharp";
import ScrollableChat from "./ScrollableChat";

import io from 'socket.io-client';
const ENDPOINT = "http://localhost:5000";
var socket, selectedChatComapre;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const { user, selectedChat, setSelectedChat } = ChatState();
  
  const [socketConnected, setSocketConnected] = useState(false)
  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.log("Could Not get Messages");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        // console.log(data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log("Failed To send Message");
      }
    } else {
      console.log("sed");
    }
  };
  const sendMessage2 = async (event) => {
    if (newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        // console.log(data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log("Failed To send Message");
      }
    } else {
      console.log("sed");
    }
  };
  
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on('connection', () => {setSocketConnected(true)})
  }, [])
  

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Typography
            sx={{
              fontSize: { base: "28px", md: "30px" },
              margin: "0px 24px 12px 24px",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{ display: { base: "flex", md: "none" } }}
              onClick={() => setSelectedChat("")}
            >
              <ArrowBackIosIcon />
            </IconButton>

            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.user)}
                <ProfileModal user={getSenderFull(user, selectedChat.user)}>
                  <Badge badgeContent={<InfoIcon />}>
                    <Avatar
                      src={getSenderPic(user, selectedChat.user)}
                      sx={{ border: "solid 1.5px" }}
                    />
                  </Badge>
                </ProfileModal>
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection:"column",
              justifyContent: "flex-end",
              padding: "12px",
              background: "#C3C3C3",
              width: "98%",
              height: "100%",
              borderRadius: "10px",
              overflowY: "hidden",
            }}
          >
            {loading ? <></> : 
            <div className = "messages">
              <ScrollableChat messages={messages} />
            </div>
            }
          </Box>
          <FormControl
            onKeyDown={sendMessage}
            required
            fullWidth
            sx={{ paddingTop: "5px" }}
          > 
            <Box sx={{ width: "100%", display: "flex" }}>
              <TextField
                size="small"
                autoComplete="off"
                label="Enter a Message"
                onChange={typingHandler}
                value={newMessage}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={sendMessage2}>
                      <SendSharp />
                    </IconButton>
                  ),
                }}
              />
            </Box>
          </FormControl>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography variant="h6" sx={{ color: "#838383" }}>
            Click on a user to start chatting !
          </Typography>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
