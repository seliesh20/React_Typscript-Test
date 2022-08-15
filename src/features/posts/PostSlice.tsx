import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();
  return posts;
});

export type PostType = {
    id:Number,
    title:String,
    body:String
}

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    entities: [],
    loading: false,
  },
  reducers: {
    postAdded(state:any, action:any) {
      state.entities.push(action.payload);
    },
    postUpdated(state, action) {
      const { id, title, body } = action.payload;
      const existingPost:any = state.entities.find((post:PostType) => post.id === id);
      if (existingPost) {
        console.log(existingPost.title)
        existingPost.title = title;
        existingPost.body = body;
      }
    },
    postDeleted(state, action) {
      const { id } = action.payload;
      const existingPost = state.entities.find((post:PostType) => post.id === id);
      if (existingPost) {
        state.entities = state.entities.filter((post:PostType) => post.id !== id);
      }
    },
  },
  extraReducers: builder =>{
    builder.addCase(fetchPosts.pending, (state:any, action:any) => {
        state.loading = true;
    })
    builder.addCase(fetchPosts.fulfilled, (state:any, action:any) => {
        state.loading = false;
        state.entities = [...state.entities, ...action.payload];
    })
    builder.addCase(fetchPosts.rejected, (state:any, action:any) => {
        state.loading = false;
    })
  }
});

export const { postAdded, postUpdated, postDeleted } = postsSlice.actions;

export default postsSlice.reducer;