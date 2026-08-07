import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import {
    selectAllPosts,
} from "../features/posts/postsSlice";

import PostCard from "./PostCard";

function PostList() {

    const posts = useSelector(selectAllPosts);

    const [searchTerm, setSearchTerm] = useState("");
    const [platformFilter, setPlatformFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("Newest");

    const filteredPosts = useMemo(() => {

        let filtered = [...posts];

        // Search
        if (searchTerm.trim() !== "") {
            filtered = filtered.filter((post) =>
                post.content
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        }

        // Platform Filter
        if (platformFilter !== "All") {
            filtered = filtered.filter(
                (post) => post.platform === platformFilter
            );
        }

        // Sorting
        if (sortOrder === "Newest") {
            filtered.sort(
                (a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
            );
        }

        if (sortOrder === "Oldest") {
            filtered.sort(
                (a, b) =>
                    new Date(a.createdAt) - new Date(b.createdAt)
            );
        }

        if (sortOrder === "Alphabetical") {
            filtered.sort((a, b) =>
                a.content.localeCompare(b.content)
            );
        }

        return filtered;

    }, [posts, searchTerm, platformFilter, sortOrder]);

    const renderedPosts = useMemo(() => {

        return filteredPosts.map((post) => (
            <PostCard
                key={post.id}
                post={post}
            />
        ));

    }, [filteredPosts]);

    return (
        <div className="post-list">

            <h2>Saved Posts</h2>

            <div className="toolbar">

                <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                />

                <select
                    value={platformFilter}
                    onChange={(e) =>
                        setPlatformFilter(e.target.value)
                    }
                >
                    <option>All</option>
                    <option>Twitter</option>
                    <option>LinkedIn</option>
                    <option>Instagram</option>
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) =>
                        setSortOrder(e.target.value)
                    }
                >
                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>Alphabetical</option>
                </select>

            </div>

            {filteredPosts.length === 0 ? (

                <div className="empty-state">

                    <div className="empty-icon">
                        📭
                    </div>

                    <h2>No Posts Found</h2>

                    <p>
                        Try changing the search or filter.
                    </p>

                </div>

            ) : (

                renderedPosts

            )}

        </div>
    );
}

export default PostList;