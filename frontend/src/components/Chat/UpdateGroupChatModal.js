import React, {useState} from 'react'
import InfoIcon from '@mui/icons-material/Info';
import LoadingButton from '@mui/lab/LoadingButton';
import { ChatState } from '../../Context/ChatProvider';
import { Modal, Box, Avatar, Container, Typography, TextField, Button, Stack, Chip, Snackbar, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import axios from "axios";
import UserListItem from './UserListItem';
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
const UpdateGroupChatModal = ({fetchAgain, setFetchAgain}) => {
    const {selectedChat, setSelectedChat, user} = ChatState();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [groupChatName, setGroupChatName] = React.useState();
    const [selectedUsers, setSelectedUsers] = React.useState([]);
    const [search, setSearch] = React.useState("");
    const [searchResult, setSearchResult] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [renameloading, setRenameloading] = useState(false)
    const handleRemove = async(remUser) => {
        if(selectedChat.groupAdmin._id !== user._id && remUser._id !== user._id) return;
        try {
            setLoading(true);
            const config = {
                headers: {
                Authorization: `Bearer ${user.token}`,
                },
            };
            const {data} = await axios.put("api/chat/groupremove", {
                chatId: selectedChat._id,
                userId: remUser._id,
            }, config); 

            remUser._id === user._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false); 
        } catch (error) {
            console.log(error);
            setLoading(false); 
            return;
        }
    };
    const handleRename = async() => {
        if(!groupChatName) return;
        try {
            setRenameloading(true);
            const config = {
                headers: {
                Authorization: `Bearer ${user.token}`,
                },
            };
            const {data} = await axios.put("/api/chat/rename", {
                chatId : selectedChat._id,
                chatName: groupChatName,
            }, config);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameloading(false)
        } catch (error) {
            console.log(error);
            setRenameloading(false);
        }
        setGroupChatName("");

    };

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
            console.log(error);
            setLoading(false);
        }
    };

    const handleAddUser = async(userToAdd) => {
        if(selectedChat.user.find((u) => u._id === userToAdd._id)) return;
        if(selectedChat.groupAdmin._id !== user._id) return; //only admin can add users
        try {
            setLoading(true);
            const config = {
                headers: {
                Authorization: `Bearer ${user.token}`,
                },
            };
            const {data} = await axios.put("/api/chat/groupadd", {
                chatId : selectedChat._id,
                userId : userToAdd._id
            }, config);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    };

  return (
    <>
    <InfoIcon onClick={handleOpen} />

    <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h5" sx={{display:"flex", justifyContent:"center", marginBottom:"12px"}}>{selectedChat.chatName}</Typography>
                    <Stack direction="row" spacing={1} sx={{width:"95%", display:"flex", flexWrap:"wrap"}}>
                        {selectedChat.user.map((u) => (
                            <Chip 
                            key={u._id}
                            color="primary" 
                            onDelete={() => handleRemove(u)} 
                            avatar={<Avatar src={u.pic} />} 
                            label={u.name}
                            sx={{marginBottom: "5px"}}
                            />
                        ))}
                    </Stack>
                <TextField size="small" placeholder='Chat Name' sx={{marginBottom: "12px", marginRight:"8px"}} value={groupChatName} onChange={(e) => setGroupChatName(e.target.value)} />
                <LoadingButton
                    size="large"
                    onClick={handleRename}
                    endIcon={<SendIcon />}
                    loading={renameloading}
                    loadingPosition="end"
                    variant="contained"
                >
                    Submit
                </LoadingButton>
                <TextField 
                    placeholder="Add Users" 
                    sx = {{marginBottom: "4px"}}
                    onChange={(e) => handleSearch(e.target.value)}
                    size = "small"
                />
                {loading ? <LoadingButton loading variant="standard" /> : (
                    searchResult?.slice(0,4).map(user => (
                        <UserListItem 
                            key={user._id}
                            user={user}
                            handleFunction={() => handleAddUser(user)}

                        />
                    ))
                )}
                <Button onClick={() => handleRemove(user)} sx={{color:"red"}}>Leave Group</Button>
           </Box>
    </Modal>
    </>
  )
}

export default UpdateGroupChatModal