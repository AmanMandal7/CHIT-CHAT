import { ViewIcon } from '@chakra-ui/icons';
import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import UserListItem from '../UserAvatar/UserListItem';

const UpdateGroupChatModal = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);

    const toast = useToast();

    const { user, selectedChat, setSelectedChat, fetchAgain, setFetchAgain } = ChatState();

    const handleAddUser = async (user1) => {
        if (selectedChat.users.find((u) => u._id === user1._id)) {
            toast({
                title: "User already Exist!",
                status: "error",
                isClosable: true,
                duration: 5000,
                position: "bottom",
            });
            return;
        };

        if (selectedChat.groupAdmin._id !== user._id) {
            toast({
                title: "Only Admins can add or remove user!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            };

            const { data } = await axios.put("/api/chat/groupadd", {
                chatId: selectedChat._id,
                userId: user1._id,
            },
                config
            );

            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false);
        }
    };

    const handleRemove = async (user1) => {
        if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
            toast({
                title: "Only Admins can add or remove user!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            };

            const { data } = await axios.put("/api/chat/groupremove", {
                chatId: selectedChat._id,
                userId: user1._id,
            },
                config
            );


            user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
            setLoading(false);
            setFetchAgain(!fetchAgain);

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setLoading(false);
        }
    };

    const handleRename = async () => {
        if (!groupChatName) return;

        try {
            setRenameLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            };

            const { data } = await axios.put("/api/chat/rename",
                {
                    chatId: selectedChat._id,
                    chatName: groupChatName
                },
                config,
            );

            setSelectedChat(data);
            setRenameLoading(false);
            setGroupChatName("");
            setFetchAgain(!fetchAgain);

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setRenameLoading(false);
        }

        setGroupChatName("");
    };

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) {
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
            console.log(data);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured",
                description: "Failed to Load the Search Results",
                status: "error",
                isClosable: true,
                duration: 5000,
                position: "bottom-left"
            });
            setLoading(false);
        }
    };


    return (
        <>
            <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="35px" fontFamily="Work sans" display="flex" justifyContent="center">{selectedChat.chatName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box width="100%" display="flex" flexWrap="wrap" paddingBottom={3}>
                            {selectedChat.users.map(u => (
                                <UserBadgeItem
                                    key={user._id}
                                    user={u}
                                    handleFunction={() => handleRemove(u)}
                                />
                            ))}
                        </Box>

                        <FormControl display="flex">
                            <Input
                                placeholder="Chap Name"
                                marginBottom={3}
                                value={groupChatName}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                            <Button
                                variant="solid"
                                colorScheme="teal"
                                marginLeft={1}
                                isLoading={renameLoading}
                                onClick={handleRename}
                            >
                                Update
                            </Button>
                        </FormControl>

                        <FormControl>
                            <Input
                                placeholder="Add User to group"
                                marginBottom={1}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        {
                            searchResult && searchResult?.map((user) => (
                                <UserListItem
                                    key={user._id}
                                    user={user}
                                    handleFunction={() => handleAddUser(user)}
                                />
                            ))
                        }


                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => handleRemove(user)} colorScheme="red">
                            Leave Group
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    )
}

export default UpdateGroupChatModal
