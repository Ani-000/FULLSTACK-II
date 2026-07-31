import { useState, useEffect } from "react";
import { validatePost } from "../utils/validationStrategy";
import { saveDraftMock } from "../utils/mockApi";
import { toast } from "react-toastify";
import "./PostComposer.css";

function PostComposer({ 
    addDraft,
    updateDraft,
    editingDraft,
    setEditingDraft
}) {
    const [content, setContent] = useState("");
    const [platform, setPlatform] = useState("twitter");

    useEffect(() => {
        if (editingDraft) {
            setContent(editingDraft.content);
            setPlatform(editingDraft.platform);
        }
    }, [editingDraft]);

    // Validate the post
    const validation = validatePost(content, platform);

    // Save Draft
    const handleSaveDraft = async () => {
        // Stop if validation fails
        if (!validation.isValid) {
            toast.error(validation.error);
            return;
        }

        try {
            // Simulate API request
            const result = await saveDraftMock({
                content,
                platform,
            });

            // Add draft to local state
            addDraft(result);

            // Reset form
            setContent("");
            setPlatform("twitter");

            toast.success("Draft saved successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to save draft. Please try again.");
        }
    };

    return (
        <div className="post-composer">

            <h1>Multi Platform Post Composer</h1>

            <div className="form-group">
                <label htmlFor="platform">Select Platform</label>

                <select
                    id="platform"
                    value={platform}
                    onChange={(event) => setPlatform(event.target.value)}
                >
                    <option value="twitter">Twitter</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="instagram">Instagram</option>
                </select>
            </div>

            <p className="selected-platform">
                <strong>Selected Platform:</strong>{" "}
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </p>

            <div className="form-group">
                <textarea
                    rows="8"
                    placeholder="Write your post here..."
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                />
            </div>

            <p className="character-count">
                Characters: <strong>{content.length}</strong> / {validation.limit} 
            </p>

            {validation.isValid ? (
                <p className="success-message">
                    ✓ Post is valid
                </p>
            ) : (
                <p className="error-message">
                    {validation.error}
                </p>
            )}

            <button
                className="save-btn"
                onClick={handleSaveDraft}
                disabled={!validation.isValid}
            >
                Save Draft
            </button>

        </div>
    );
}

export default PostComposer;