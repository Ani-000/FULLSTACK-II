import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import "./Dashboard.css";

function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        const theme = darkMode ? "dark" : "light";

        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [darkMode]);

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully.");
        navigate("/login");
    };

    return (
        <div className="dashboard-layout">

            <nav className="navbar">

                <div className="navbar-brand">
                    Social Media Dashboard
                </div>

                <div className="nav-links">

                    <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/dashboard/posts"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Posts
                    </NavLink>

                    {(user?.role === "Admin" ||
                        user?.role === "Editor") && (
                        <NavLink
                            to="/dashboard/analytics"
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            Analytics
                        </NavLink>
                    )}

                    {user?.role === "Admin" && (
                        <NavLink
                            to="/dashboard/admin"
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            Admin
                        </NavLink>
                    )}

                </div>

                <div className="navbar-actions">

                    <span
                        className={`role-badge ${user?.role?.toLowerCase()}`}
                    >
                        {user?.role}
                    </span>

                    <span className="username">
                        {user?.username}
                    </span>

                    <button
                        className="theme-toggle"
                        onClick={() => setDarkMode(!darkMode)}
                        aria-label="Toggle theme"
                    >
                        {darkMode ? "☀️" : "🌙"}
                    </button>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </nav>

            <main className="dashboard-content">
                <Outlet />
            </main>

        </div>
    );
}

export default Dashboard;