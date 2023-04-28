import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useState, useEffect } from "react";
import { apiUser } from "../api/apiUser";

export const MessageContext = createContext();

export const MessageProvider = ({ children, socketIo }) => {

    const { isLoading, isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
    const [socketMessageNotification, setSocketMessageNotification] = useState({
        notification: false,
        conversavions: []
    });
    const [userId, setUserId] = useState();
    const [userCollection, setUserCollection] = useState()
    const [selectedChat, setSelectedChat] = useState();
    const [selectedPage, setSelectedPage] = useState();

    const [socket, setSocket] = useState(null)

    useEffect(() => {
        if (socketIo) {
            setSocket(socketIo);

            let token = localStorage.getItem('token');
            // if (!user) {
            //     logout()
            // }

            let headers = {
                authorization: `Bearer ${token}`
            }
            apiUser.getUser({ headers })
                .then(function (response) {
                    setUserId(response)
                })
                .catch(function (error) {
                    console.log(error)
                });
            socketIo.on('getNotification', (data => {
                setSocketMessageNotification(data);
            }))
        }
    }, [socketIo])

    useEffect(() => {
        if (socketIo) {
            userId && socketIo && socket.emit("addUser", userId._id);
        }

        let token = localStorage.getItem('token');
        // request for user data
        if(token){
            let headers = {
                authorization: `Bearer ${token}`
            }
            apiUser.getUser({ headers })
                .then(function (response) {
                    const conversationNotification = response.conversationNotification
                    setUserCollection(response.collections)
                    if (conversationNotification && conversationNotification.length > 0) {
                        setSocketMessageNotification({
                            notification: true,
                            conversavions: conversationNotification
                        })
                    }
                })
                .catch(function (error) {
                    console.log(error)
                });
        }

    }, [userId])

    useEffect(() => {
        const conversNotification = socketMessageNotification.conversavions
        const dataIndex = conversNotification.findIndex(el => el === selectedChat?._id);

        if (dataIndex !== -1) {
            conversNotification.splice(dataIndex, 1);
            setSocketMessageNotification({ notification: conversNotification.length > 0 ? true : false, conversavions: conversNotification })
        }
    }, [selectedChat, socketMessageNotification]);

    useEffect(() => {
        if (selectedPage !== 'Chat') {
            setSelectedChat();
        }
    }, [selectedPage]);

    return <MessageContext.Provider value={{ socket, userId, socketMessageNotification, setSocketMessageNotification, setSelectedChat, setSelectedPage, userCollection, setUserCollection }}>
        {children}
    </MessageContext.Provider>
};