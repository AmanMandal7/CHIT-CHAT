import React, { useEffect } from 'react'
import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import Login from '../components/authentication/Login'
import Signup from '../components/authentication/Signup'
import { useNavigate } from 'react-router-dom'


const Homepage = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("userInfo"));
    useEffect(() => {

        if (user) {
            navigate("/chats");
        }
    }, [navigate, user]);

    return (
        <Container maxW='xl' centerContent>
            <Box
                display="flex"
                justifyContent="center"
                padding="3"
                background="white"
                width="100%"
                margin="20px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"

            >
                <Text fontSize='3xl' fontFamily="Work sans" color="black">Chit-Chat</Text>
            </Box>

            <Box bg="white" w="100%" p="4" borderRadius="lg" color="black" borderWidth="1px" >
                <Tabs variant='soft-rounded' colorScheme='blue'>
                    <TabList >
                        <Tab width="50%">Login</Tab>
                        <Tab width="50%">Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel> <Login /> </TabPanel>
                        <TabPanel> <Signup /> </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default Homepage
