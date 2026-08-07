import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
    savePost,
    updatePost,
    cancelEditing,
    selectEditingPost,
} from "../features/posts/postsSlice";

import {
    validatePost,
    PLATFORM_LIMITS,
} from "../utils/validation";

import CharacterCounter from "./CharacterCounter";
import Spinner from "./Spinner";

function PostComposer() {

    const dispatch = useDispatch();

    const loading = useSelector((state) => state.posts.loading);
    const editingPost = useSelector(selectEditingPost);

    const [platform, setPlatform] = useState("Twitter");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (editingPost) {
            setPlatform(editingPost.platform);
            setContent(editingPost.content);
        }
    }, [editingPost]);

    const validation = validatePost(content, platform);

    const maxLength = PLATFORM_LIMITS[platform];

    const resetForm = () => {
        setPlatform("Twitter");
        setContent("");
    };

    const handleSubmit = async () => {

        if (!validation.isValid) {
            toast.error(validation.error);
            return;
        }

        if (editingPost) {

            dispatch(
                updatePost({
                    id: editingPost.id,
                    changes: {
                        platform,
                        content,
                    },
                })
            );

            toast.success("Post updated successfully.");

            dispatch(cancelEditing());

            resetForm();

            return;
        }

        await dispatch(
            savePost({
                id: Date.now().toString(),
                platform,
                content,
                createdAt: new Date().toISOString(),
            })
        );

        toast.success("Post saved successfully.");

        resetForm();
    };

    const handleCancel = () => {
        dispatch(cancelEditing());
        resetForm();
    };

    return (
        <div className="post-composer">

            <h2>
                {editingPost ? "Edit Post" : "Create Post"}
            </h2>

            <label>Platform</label>

            <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
            >
                <option value="Twitter">Twitter</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Instagram">Instagram</option>
            </select>

            <label>Content</label>

            <textarea
                placeholder="Write your post..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <CharacterCounter
                currentLength={content.length}
                maxLength={maxLength}
            />

            {!validation.isValid && (
                <p className="error-message">
                    {validation.error}
                </p>
            )}

            <div className="button-group">

                <button
                    className="save-btn"
                    onClick={handleSubmit}
                    disabled={loading || !validation.isValid}
                >
                    {loading ? (
                        <>
                            <Spinner />
                            Saving...
                        </>
                    ) : editingPost ? (
                        "Update Post"
                    ) : (
                        "Save Post"
                    )}
                </button>

                {editingPost && (
                    <button
                        className="cancel-btn"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                )}

            </div>

        </div>
    );
}

export default PostComposer;