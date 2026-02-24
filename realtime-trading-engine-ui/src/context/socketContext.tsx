import React, {createContext, useEffect} from "react";
import { socket, connectSocket } from "../utils/socket";


interface SocketContextProps {
    socket: typeof socket;
}

export const SocketContext = createContext<SocketContextProps>({socket});
export const SocketProvider : React.FC<{children: React.ReactNode}>= ({children}) => {
    useEffect(() => {
        connectSocket();
        return () => socket.disconnect();
    }, [])

    return <SocketContext.Provider value = {{socket}}>{children}</SocketContext.Provider>
}