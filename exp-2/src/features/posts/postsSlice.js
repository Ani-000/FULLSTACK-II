import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
} from "@reduxjs/toolkit";

import { savePostApi } from "../../utils/fakeApi";

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) =>
        b.createdAt.localeCompare(a.createdAt),
});

const initialState = postsAdapter.getInitialState({
    loading: false,
    error: null,
    editingPostId: null,
});

export const savePost = createAsyncThunk(
    "posts/savePost",
    async (post) => {
        const savedPost = await savePostApi(post);
        return savedPost;
    }
);

const postsSlice = createSlice({
    name: "posts",

    initialState,

    reducers: {

        deletePost: postsAdapter.removeOne,

        updatePost: postsAdapter.updateOne,

        startEditing(state, action) {
            state.editingPostId = action.payload;
        },

        cancelEditing(state) {
            state.editingPostId = null;
        },

    },

    extraReducers: (builder) => {

        builder

            .addCase(savePost.pending, (state) => {
                state.loading = true;
            })

            .addCase(savePost.fulfilled, (state, action) => {
                state.loading = false;

                postsAdapter.addOne(state, action.payload);
            })

            .addCase(savePost.rejected, (state) => {
                state.loading = false;

                state.error = "Failed to save post.";
            });

    },

});

export const {
    deletePost,
    updatePost,
    startEditing,
    cancelEditing,
} = postsSlice.actions;

export default postsSlice.reducer;

/* ---------- Entity Adapter Selectors ---------- */

const adapterSelectors = postsAdapter.getSelectors(
    (state) => state.posts
);

export const selectAllPosts = adapterSelectors.selectAll;

export const selectPostById = adapterSelectors.selectById;

export const selectPostIds = adapterSelectors.selectIds;

/* ---------- Editing Selector ---------- */

export const selectEditingPost = createSelector(
    [
        selectAllPosts,
        (state) => state.posts.editingPostId,
    ],

    (posts, editingPostId) =>
        posts.find((post) => post.id === editingPostId)
);

/* ---------- Statistics Selectors ---------- */

export const selectTotalPosts = createSelector(
    [selectAllPosts],
    (posts) => posts.length
);

export const selectTwitterPosts = createSelector(
    [selectAllPosts],
    (posts) =>
        posts.filter(
            (post) => post.platform === "Twitter"
        ).length
);

export const selectLinkedInPosts = createSelector(
    [selectAllPosts],
    (posts) =>
        posts.filter(
            (post) => post.platform === "LinkedIn"
        ).length
);

export const selectInstagramPosts = createSelector(
    [selectAllPosts],
    (posts) =>
        posts.filter(
            (post) => post.platform === "Instagram"
        ).length
);

/* ---------- Derived Selector ---------- */

export const selectPostsByPlatform = createSelector(
    [
        selectAllPosts,
        (_, platform) => platform,
    ],

    (posts, platform) => {

        if (platform === "All") {
            return posts;
        }

        return posts.filter(
            (post) => post.platform === platform
        );

    }
);