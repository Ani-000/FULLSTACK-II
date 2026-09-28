import { useState } from "react";

function App() {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);

    const login = (role) => {
        if (!username.trim()) {
            alert("Please enter username");
            return;
        }

        setUser({
            username: username.trim(),
            role: role,
        });
    };

    const logout = () => {
        setUser(null);
        setUsername("");
    };

    if (user) {
        return (
            <div className="container">
                <h1>
                    Welcome, {user.username} ({user.role})
                </h1>

                {user.role === "Admin" ? (
                    <button className="delete-btn">
                        Delete Post
                    </button>
                ) : (
                    <p>Read-only access</p>
                )}

                <button className="logout-btn" onClick={logout}>
                    Logout
                </button>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Login</h1>

            <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <div className="buttons">
                <button onClick={() => login("Admin")}>
                    Login as Admin
                </button>

                <button onClick={() => login("Viewer")}>
                    Login as Viewer
                </button>
            </div>
        </div>
    );
}

export default App;