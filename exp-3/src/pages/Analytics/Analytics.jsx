import { useAuth } from "../../context/AuthContext";
import "./Analytics.css";

function Analytics() {

    const { user } = useAuth();

    const users = [
        { username: "admin", role: "Admin" },
        { username: "editor", role: "Editor" },
        { username: "viewer", role: "Viewer" },
    ];

    return (

        <div className="analytics-container">

            <div className="page-header">

                <h1>📊 Analytics Dashboard</h1>

                <p>Role-based user statistics.</p>

            </div>

            <div className="analytics-grid">

                <div className="analytics-card">
                    <h3>Total Users</h3>
                    <span>{users.length}</span>
                </div>

                <div className="analytics-card">
                    <h3>Admins</h3>
                    <span>
                        {users.filter(u => u.role === "Admin").length}
                    </span>
                </div>

                <div className="analytics-card">
                    <h3>Editors</h3>
                    <span>
                        {users.filter(u => u.role === "Editor").length}
                    </span>
                </div>

                <div className="analytics-card">
                    <h3>Viewers</h3>
                    <span>
                        {users.filter(u => u.role === "Viewer").length}
                    </span>
                </div>

                <div className="analytics-card primary">
                    <h3>Current User</h3>
                    <span>{user?.username}</span>
                </div>

                <div className="analytics-card">
                    <h3>Current Role</h3>
                    <span>{user?.role}</span>
                </div>

            </div>

        </div>

    );

}

export default Analytics;