import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const USERS = [
    {
        username: "admin",
        password: "admin123",
        role: "Admin",
    },
    {
        username: "editor",
        password: "editor123",
        role: "Editor",
    },
    {
        username: "viewer",
        password: "viewer123",
        role: "Viewer",
    },
];

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const savedUser = localStorage.getItem("user");

        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }

    }, []);

    const login = (username, password) => {

        const foundUser = USERS.find(
            (u) =>
                u.username === username &&
                u.password === password
        );

        if (!foundUser) {
            return false;
        }

        const token = {
            token: "mock-jwt-token",
            username: foundUser.username,
            role: foundUser.role,
        };

        localStorage.setItem(
            "user",
            JSON.stringify(token)
        );

        setUser(token);

        return true;
    };

    const logout = () => {

        localStorage.removeItem("user");

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}