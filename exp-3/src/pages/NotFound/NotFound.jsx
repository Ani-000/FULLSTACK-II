import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {

    return (

        <div className="notfound-container">

            <div className="notfound-card">

                <h1>404</h1>

                <h2>Page Not Found</h2>

                <p>
                    The page you are looking for doesn't exist
                    or has been moved.
                </p>

                <Link
                    to="/dashboard"
                    className="home-btn"
                >
                    Return Home
                </Link>

            </div>

        </div>

    );

}

export default NotFound;