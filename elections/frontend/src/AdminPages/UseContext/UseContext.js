import { useState, createContext, useContext } from "react";

const NotifyContext = createContext();

export const NotifyProvider = ({ children }) => {
    const [notifications, setNotifications] = useState(0);
    const updateNotifications = () => {
        setNotifications(prev => prev + 1);
        // let value = parseInt(localStorage.getItem('notifications')); // Parse as integer, default to 0
        // value += 1;
        // console.log(value);
        // localStorage.setItem('notifications', value.toString());
        // console.log(localStorage.getItem('notification'))
    };
    return (
        <NotifyContext.Provider value={{ notifications, updateNotifications }}>
            {children}
        </NotifyContext.Provider>
    )
}

export const useNotify = () => useContext(NotifyContext);