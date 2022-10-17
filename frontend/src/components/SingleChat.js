import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, IconButton, Text } from '@chakra-ui/react';
import React from 'react'
import { getSender, getSenderFull } from '../config/ChatLogics';
import { ChatState } from '../context/ChatProvider'
import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';

const SingleChat = () => {

    const { user, selectedChat, setSelectedChat } = ChatState();

    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        paddingBottom={3}
                        paddingX={2}
                        width="100%"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent={{ base: "space-between" }}
                        alignItems="center"
                    >
                        <IconButton
                            display={{ base: "flex", md: "none" }}
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat("")}
                        />
                        {!selectedChat.isGroupChat ? (
                            <>
                                {getSender(user, selectedChat?.users)}
                                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                            </>
                        ) : (
                            <>
                                {selectedChat.chatName.toUpperCase()}
                                {<UpdateGroupChatModal />}
                            </>

                        )}
                    </Text>

                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-end"
                        padding={3}
                        background="#E8E8E8"
                        width="100%"
                        height="100%"
                        borderRadius="lg"
                        overflowY="hidden"
                    >

                    </Box>
                </>
            ) : (
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                    <Text fontSize="3xl" paddingBottom={3} fontFamily="Work sans">
                        Click on a User to Start Chatting...
                    </Text>
                </Box>
            )}
        </>
    )
}

export default SingleChat
