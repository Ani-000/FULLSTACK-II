import { useAuth } from "../../context/AuthContext";
import "./Posts.css";

function Posts() {

    const { user } = useAuth();

    const posts = [
        {
            id: 1,
            platform: "Twitter",
            title: "React Router Authentication",
            author: "admin",
        },
        {
            id: 2,
            platform: "LinkedIn",
            title: "Understanding JWT Tokens",
            author: "editor",
        },
        {
            id: 3,
            platform: "Instagram",
            title: "Role-Based Access Control",
            author: "admin",
        },
    ];

    return (
        <div className="posts-container">

            <div className="posts-header">

                <h1>📝 Posts Management</h1>

                <p>
                    View and manage social media posts based on your role.
                </p>

            </div>

            {(user.role === "Admin" || user.role === "Editor") && (

                <button className="create-btn">

                    + Create New Post

                </button>

            )}

            <div className="posts-grid">

                {posts.map((post) => (

                    <div
                        className="post-card"
                        key={post.id}
                    >

                        <h3>{post.title}</h3>

                        <p>

                            <strong>Platform:</strong> {post.platform}

                        </p>

                        <p>

                            <strong>Author:</strong> {post.author}

                        </p>

                        <div className="post-actions">

                            <button className="view">

                                View

                            </button>

                            {(user.role === "Admin" ||
                                user.role === "Editor") && (

                                <button className="edit">

                                    Edit

                                </button>

                            )}

                            {user.role === "Admin" && (

                                <button className="delete">

                                    Delete

                                </button>

                            )}

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Posts;