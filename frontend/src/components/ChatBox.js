import { Box } from '@chakra-ui/react'
import React from 'react'
import { ChatState } from '../context/ChatProvider'
import SingleChat from './SingleChat';

const ChatBox = () => {

    const { selectedChat } = ChatState();

    return (
        <Box
            display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
            flexDirection="column"
            alignItems="center"
            padding={3}
            background="white"
            width={{ base: "100%", md: "68%" }}
            borderRadius="lg"
            borderWidth="1px"
        >
            <SingleChat />
        </Box>
    )
}

export default ChatBox
