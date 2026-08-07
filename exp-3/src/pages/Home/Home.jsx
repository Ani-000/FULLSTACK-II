import { useAuth } from "../../context/AuthContext";
import "./Home.css";

function Home() {

    const { user } = useAuth();

    return (

        <div className="home-dashboard">

            <div className="welcome-card">

                <h1>
                    Welcome, {user?.username} 👋
                </h1>

                <p>
                    You are logged in as <strong>{user?.role}</strong>.
                </p>

            </div>

            <div className="dashboard-cards">

                <div className="dashboard-card">

                    <h3>Current User</h3>

                    <p>{user?.username}</p>

                </div>

                <div className="dashboard-card">

                    <h3>Current Role</h3>

                    <p>{user?.role}</p>

                </div>

                <div className="dashboard-card">

                    <h3>Authentication Method</h3>

                    <p>JWT</p>

                </div>

            </div>

        </div>

    );

}

export default Home;