import { Box } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider"
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'
import { useState } from "react";


const ChatPage = () => {

    const { user } = ChatState();
    const [fetchAgain, setFetchAgain] = useState();

    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box
                display='flex'
                justifyContent='space-between'
                width='100%'
                height='91.5vh'
                padding='10px'
            >
                {user && <MyChats fetchAgain={fetchAgain} />}
                {user && <ChatBox fetchAgain={fetchAgain} setFetchAgian={setFetchAgain} />}
            </Box>

        </div>
    )
}

export default ChatPage

