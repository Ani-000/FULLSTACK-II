import { Link } from "react-router-dom";
import "./Unauthorized.css";

function Unauthorized() {

    return (

        <div className="unauthorized-container">

            <div className="unauthorized-card">

                <div className="unauthorized-icon">
                    🚫
                </div>

                <h1>Access Denied</h1>

                <p>
                    You do not have permission to access this page.
                </p>

                <Link
                    to="/dashboard"
                    className="back-btn"
                >
                    Return to Dashboard
                </Link>

            </div>

        </div>

    );

}

export default Unauthorized;