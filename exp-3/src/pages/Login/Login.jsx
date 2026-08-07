import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../../context/AuthContext";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const { login, user } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = login(username, password);

        if (success) {
            toast.success("Login Successful!");
            navigate("/dashboard");
        } else {
            toast.error("Invalid username or password.");
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="login-header">

                    <h1>Social Media Dashboard</h1>

                    <p>
                        Sign in to continue
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <label>Username</label>

                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">
                        Secure Login
                    </button>

                </form>

                <div className="demo-box">

                    <h3>Demo Accounts</h3>

                    <table>

                        <thead>
                            <tr>
                                <th>Role</th>
                                <th>Username</th>
                                <th>Password</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr>
                                <td>Admin</td>
                                <td>admin</td>
                                <td>admin123</td>
                            </tr>

                            <tr>
                                <td>Editor</td>
                                <td>editor</td>
                                <td>editor123</td>
                            </tr>

                            <tr>
                                <td>Viewer</td>
                                <td>viewer</td>
                                <td>viewer123</td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default Login;