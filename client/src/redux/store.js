import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from "./features/auth/authSlice";
import { postSlice } from "./features/post/postSlice";

const rootReducer = {
	auth: authSlice.reducer,
	post: postSlice.reducer
};

export const store = configureStore({
	reducer: rootReducer
});