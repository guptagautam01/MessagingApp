import * as React from "react";
import FaceIcon from "@mui/icons-material/Face";
import { Modal, Box, Avatar, Container, Typography, TextField, Button, Stack, Chip, Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import LoadingButton from '@mui/lab/LoadingButton';
import UserListItem from "./UserListItem";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#f2eff1F0",
  boxShadow: 24,
  p: 4,
};


const GroupChatModal = ({children}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [groupChatName, setGroupChatName] = React.useState();
    const [selectedUsers, setSelectedUsers] = React.useState([]);
    const [search, setSearch] = React.useState("");
    const [searchResult, setSearchResult] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const {user, chats, setChats} = ChatState();

    const [snackStatus, setSnackStatus] = React.useState(false);
    const [snackMessage, setSnackMessage] = React.useState("");

    const handleSearch = async(query) => {
        setSearch(query);
        if(!query){
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
            setSnackMessage(error.response.data.message);
            setSnackStatus(true);
        }
    };
    const handleGroup = (userToAdd) => {
        if(selectedUsers.includes(userToAdd)){
            console.log(userToAdd.name);
            return;
        }
        setSelectedUsers([...selectedUsers, userToAdd]);
    };
    const handleDelete = (userToRemove) => {
        console.log(userToRemove.name);
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== userToRemove._id));
    };
    const handleSubmit = async() => {
        if(!selectedUsers){
            setSnackMessage("Please select users")
            setSnackStatus(true);
            return;
        }
        if(!groupChatName){
            setSnackMessage("Please enter a group name")
            setSnackStatus(true);
            return;
        }
        try {
            const config = {
                headers: {
                Authorization: `Bearer ${user.token}`,
                },
            };
            const {data} = await axios.post("/api/chat/group", {
                name: groupChatName,
                user: JSON.stringify(selectedUsers.map((u)=>u._id)),
            }, config)
            setChats([data, ...chats]);
            setSelectedUsers([]);
            setSearchResult([]);
            handleClose();
        } catch (error) {
            setSnackMessage(error.response.data.message);
            setSnackStatus(true);
        }
    };

    return (
      <>
        {children ? (
          <span onClick={handleOpen}> {children} </span>
        ) : (
          <FaceIcon onClick={handleOpen} />
        )}
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography variant="h5" sx={{display:"flex", justifyContent:"center", marginBottom:"12px"}}>Create Group Chat</Typography>
            <Box sx={{
                display:"flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <TextField 
                    placeholder="Chat Name" 
                    sx = {{marginBottom: "12px"}}
                    onChange={(e) => setGroupChatName(e.target.value)}
                    size = "small"
                />
                <TextField 
                    placeholder="Add Users" 
                    sx = {{marginBottom: "4px"}}
                    onChange={(e) => handleSearch(e.target.value)}
                    size = "small"
                />
            {/* selected user */}
                <Stack direction="row" spacing={1} sx={{width:"95%", display:"flex", flexWrap:"wrap"}}>
                    {selectedUsers.map((u) => (        
                        <Chip 
                            key={u._id}
                            color="primary" 
                            onDelete={() => handleDelete(u)} 
                            avatar={<Avatar src={u.pic} />} 
                            label={u.name}
                        />
                    ))}
                </Stack>
            {/* render searched users  */}
                {loading ? <LoadingButton loading variant="standard" /> : (
                    searchResult?.slice(0,4).map(user => (
                        <UserListItem 
                            key={user._id}
                            user={user}
                            handleFunction={() => handleGroup(user)}

                        />
                    ))
                )}
                <Button variant="contained" onClick={handleSubmit}>Create</Button>
            </Box>
            
          </Box>
        </Modal>
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
      </>
    );
}

export default GroupChatModal