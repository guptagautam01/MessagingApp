import {ChatState} from "../Context/ChatProvider";
import TopBar from "../components/Chat/TopBar";
import ChatBox from "../components/Chat/ChatBox";
import MyChat from "../components/Chat/MyChat"
import { Container } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {useState} from "react";

const ChatPage = () => {
    const {user} = ChatState();
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

    const [fetchAgain, setFetchAgain] = useState(false);
    
  return (  
    <ThemeProvider theme={theme}>
    <div style={{width:"100%"}}>
      {user && <TopBar/> }
      <Container sx={{
        display:"flex", 
        justifyContent:"space-between", 
        width:"100%", 
        height:"90%", 
        padding:"10px", 
        // border:"solid"
      }}>
        {user && <MyChat fetchAgain={fetchAgain}/>}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </Container>
    </div>
    </ThemeProvider>
  )
}

export default ChatPage