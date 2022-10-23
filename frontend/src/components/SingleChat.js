import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getSender, getSenderFull } from '../config/ChatLogics';
import { ChatState } from '../context/ChatProvider'
import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import ScrollableChat from './ScrollableChat';
import './style.css'

import io from 'socket.io-client';
const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = () => {

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();
    const [socketConnected, setSocketConnected] = useState(false);

    const toast = useToast();
    const { user, selectedChat, setSelectedChat } = ChatState();

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            }

            setLoading(true);

            const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);

            console.log(messages);
            setMessages(data);
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to load the messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [selectedChat])

    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage) {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                }

                setNewMessage("");

                const { data } = await axios.post("/api/message", {
                    content: newMessage,
                    chatId: selectedChat
                }, config);

                // console.log(data);
                setMessages([...messages, data]);
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: "Failed to send the message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom"
                });
            }
        }
    };

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connection", () => setSocketConnected(true));
    }, []);

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        //Typing indicator logic
    };

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
                                <UpdateGroupChatModal fetchMessages={fetchMessages} />
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
                        {loading ? (
                            <Spinner
                                size="xl"
                                width={20}
                                height={20}
                                alignSelf="center"
                                margin="auto"
                            />
                        ) : (
                            <div className='messages'>
                                <ScrollableChat messages={messages} />
                            </div>
                        )}

                        <FormControl onKeyDown={sendMessage} isRequired marginTop={3}>
                            <Input
                                variant="filled"
                                background="#E0E0E0"
                                placeholder="Enter a message..."
                                onChange={typingHandler}
                                value={newMessage}
                            />
                        </FormControl>
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
