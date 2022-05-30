import React, { useState, useEffect } from "react";
import { ChatState } from "../../Context/ChatProvider";
import {
  Box,
  IconButton,
  Drawer,
  ListItemButton,
  List,
  ListItemText,
  ListItem,
  ListItemIcon,
  Typography,
  TextField,
  Button,
  Stack,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonSearchSharpIcon from "@mui/icons-material/PersonSearchSharp";
import GroupAddSharpIcon from "@mui/icons-material/GroupAddSharp";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";
import { getSender, getSenderPic } from "../../config/ChatLogics";
const MyChat = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const handleClick = (event) => {
    setDrawer(true);
  };
  const handleClose = () => {
    setDrawer(false);
  };
  const handleSeach = async () => {
    if (!search) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
    }
  };
  const accessChat = async (userId) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("api/chat", { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoading(false);
      handleClose();
    } catch (error) {
      console.log(error);
      return;
    }
  };
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      console.log(error);
      return;
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  return (
    <Box
      sx={{
        display: { base: selectedChat ? "none" : "flex", md: "flex" },
        flexDirection: "column",
        alignItems: "center",
        padding: "3",
        background: "#f2eff1",
        width: { base: "100%", md: "31%" },
        borderRadius: "10px",
        borderWidth: "1px",
      }}
    >
      <Box
        sx={{
          paddingBottom: "24px",
          paddingLeft: "24px",
          // paddingRight : "24px",
          fontSize: { base: "20px", md: "20px" },
          display: "flex",
          width: "90%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        My Chats
        <Box>
          <IconButton
            color="primary"
            sx={{ alignSelf: "right" }}
            onClick={handleClick}
          >
            <PersonSearchSharpIcon
              sx={{ border: "1.5px solid", borderRadius: "5px" }}
            />
          </IconButton>
          <IconButton color="primary" sx={{ alignSelf: "right" }}>
            <GroupAddSharpIcon
              sx={{ border: "1.5px solid", borderRadius: "5px" }}
            />
          </IconButton>
        </Box>
      </Box>
      <Drawer anchor="left" open={drawer} onClose={handleClose}>
        <Box role="presentation">
          <List>
            {/* {['Inbox', 'Starred-------------', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}
            <ListItem
              sx={{
                background: "#28b396",
                width: "100%",
                height: "50px",
                // display: "flex",
                borderBottomLeftRadius: "7px",
                borderBottomRightRadius: "7px",
                marginTop: "-8px",
              }}
            >
              <Typography
                // varient="h5"
                sx={{ marginLeft: "90px", fontSize: "18px" }}
              >
                <b>Search User</b>
              </Typography>
            </ListItem>
            <ListItem>
              <Box sx={{ display: "flex", padding: "15px" }}>
                <TextField
                  size="small"
                  color="success"
                  focused
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by Name or Email"
                  sx={{ width: "220px" }}
                ></TextField>
                <IconButton onClick={handleSeach}>
                  <SearchIcon />
                </IconButton>
              </Box>
            </ListItem>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
          </List>
        </Box>
      </Drawer>

      {/* Chat display */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "12px",
          background: "#f2eff1",
          width: "80%",
          // height: "100%",
          borderRadius: "10px",
          overflowY: "hidden",
        }}
      >
        {chats ? (
          <Stack spacing={1} sx={{ overflowY: "scroll" }}>
            {chats.map((chat) => (
              <Box
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                sx={{
                  cursor: "pointer",
                  alignItems: "center",
                  display: "flex",
                  background: selectedChat === chat ? "#38B2AC" : "#E8E8E8",
                  color: selectedChat === chat ? "white" : "black",
                  padding: "12px 8px 12px 8px",
                  borderRadius: "5px",
                }}
              >
                <Avatar
                  src={
                    !chat.isGroupChat
                      ? getSenderPic(loggedUser, chat.user)
                      : "https://st3.depositphotos.com/1767687/16607/v/600/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg"
                  }
                  sx={{
                    width: 40,
                    // padding: "none",
                    marginRight: "10px",
                    height: 40,
                  }}
                ></Avatar>
                <Typography variant="subtitle2">
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.user)
                    : chat.chatName}
                </Typography>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChat;
