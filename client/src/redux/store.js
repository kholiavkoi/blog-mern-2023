import { configureStore } from '@reduxjs/toolkit'
import authSlice from "./features/auth/authSlice";
import postSlice from "./features/post/postSlice";
import commentSlice from "./features/comment/commentSlice";

const rootReducer = {
	auth: authSlice,
	post: postSlice,
	comment: commentSlice
};

export const store = configureStore({
	reducer: rootReducer
});