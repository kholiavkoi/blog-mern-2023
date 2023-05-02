import { Router } from 'express'
import { checkAuth } from "../utils/checkAuth.js";
import { createPost, getAllPosts } from "../controllers/posts.js";

const router = new Router()

// Create Post
router.post('/', checkAuth, createPost)


// Get All Posts
router.get('/', getAllPosts)

export default router