import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Dashboard.css";

import { useAuth } from "../../context/AuthContext";

function Dashboard() {

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        toast.success("Logged out successfully!");

        navigate("/login");

    };

    return (

        <div>

            <nav className="navbar">

                <h2>Social Media Dashboard</h2>

                <div className="nav-links">

                    <Link to="/dashboard">
                        Home
                    </Link>

                    <Link to="/dashboard/posts">
                        Posts
                    </Link>

                    {(user?.role === "Admin" ||
                        user?.role === "Editor") && (

                        <Link to="/dashboard/analytics">
                            Analytics
                        </Link>

                    )}

                    {user?.role === "Admin" && (

                        <Link to="/dashboard/admin">
                            Admin Panel
                        </Link>

                    )}

                </div>

                <div className="user-info">

                    <span className={`role-badge ${user?.role?.toLowerCase()}`}>

                        {user?.role}

                    </span>

                    <span>

                        {user?.username}

                    </span>

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