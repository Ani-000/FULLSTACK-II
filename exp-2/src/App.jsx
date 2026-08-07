import "./App.css";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PostComposer from "./components/PostComposer";
import PostList from "./components/PostList";

import {
    selectTotalPosts,
    selectTwitterPosts,
    selectLinkedInPosts,
    selectInstagramPosts,
} from "./features/posts/postsSlice";

function App() {

    const totalPosts = useSelector(selectTotalPosts);
    const twitterPosts = useSelector(selectTwitterPosts);
    const linkedInPosts = useSelector(selectLinkedInPosts);
    const instagramPosts = useSelector(selectInstagramPosts);

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />

            <div className="app">

                <header className="app-header">
                    <h1>Redux Toolkit Post Composer</h1>

                    <p>
                        Manage social media posts with Redux Toolkit.
                    </p>
                </header>

                <div className="statistics">

                    <div className="stat-card">
                        <h3>Total Posts</h3>
                        <p>{totalPosts}</p>
                    </div>

                    <div className="stat-card twitter">
                        <h3>Twitter</h3>
                        <p>{twitterPosts}</p>
                    </div>

                    <div className="stat-card linkedin">
                        <h3>LinkedIn</h3>
                        <p>{linkedInPosts}</p>
                    </div>

                    <div className="stat-card instagram">
                        <h3>Instagram</h3>
                        <p>{instagramPosts}</p>
                    </div>

                </div>

                <div className="app-content">

                    <PostComposer />

                    <PostList />

                </div>

            </div>
        </>
    );
}

export default App;