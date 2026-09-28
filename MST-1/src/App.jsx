import { useState } from "react";

function App() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    const login = (role) => {
        if (!username.trim() || !password.trim()) {
            alert("Please enter username and password");
            return;
        }

        setUser({
            username: username.trim(),
            role,
        });

        setPassword("");
    };

    const logout = () => {
        setUser(null);
        setUsername("");
        setPassword("");
    };

    if (user) {
        return (
            <div className="page">
                <div className="card logged-in-card">

                    <div className="welcome-icon">✓</div>

                    <p className="eyebrow">LOGIN SUCCESSFUL</p>

                    <h1>
                        Welcome, <span>{user.username}</span>
                    </h1>

                    <div className="role-badge">
                        {user.role}
                    </div>

                    <div className="access-box">
                        {user.role === "Admin" ? (
                            <>
                                <p className="access-title">Admin Access</p>
                                <p className="access-text">
                                    You have permission to manage posts.
                                </p>

                                <button className="delete-btn">
                                    Delete Post
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="access-title">Viewer Access</p>
                                <p className="access-text">
                                    You have read-only access.
                                </p>

                                <div className="readonly">
                                    Read-only access
                                </div>
                            </>
                        )}
                    </div>

                    <button className="logout-btn" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="card">

                <h1>Welcome back</h1>

                <p className="subtitle">
                    Enter your details and choose a role to continue.
                </p>

                <div className="form-group">
                    <label>Username</label>

                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="role-section">
                    <p className="role-heading">Login as</p>

                    <div className="role-buttons">
                        <button
                            className="role-btn admin-btn"
                            onClick={() => login("Admin")}
                        >
                            <span className="role-name">Admin</span>
                            <span className="role-description">
                                Full access
                            </span>
                        </button>

                        <button
                            className="role-btn viewer-btn"
                            onClick={() => login("Viewer")}
                        >
                            <span className="role-name">Viewer</span>
                            <span className="role-description">
                                Read-only access
                            </span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default App;