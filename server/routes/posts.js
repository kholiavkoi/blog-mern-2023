import { Router } from 'express'
import { checkAuth } from "../utils/checkAuth.js";
import { createPost, deletePost, getAllPosts, getMyPosts, getPostById, updatePost } from "../controllers/posts.js";

const router = new Router()

// Create Post
// http://localhost:3002/api/posts
router.post('/', checkAuth, createPost)

// Get All Posts
// http://localhost:3002/api/posts
router.get('/', getAllPosts)

// Get Post by ID
// http://localhost:3002/api/posts/:id
router.get(`/:id`, getPostById)

// Update Post
// http://localhost:3002/api/posts/:id
router.put('/:id', checkAuth, updatePost)

// Get My Posts
// http://localhost:3002/api/posts/user/me
router.get(`/user/me`, checkAuth, getMyPosts)

// Delete Post
// http://localhost:3002/api/posts/:id
router.delete('/:id', checkAuth, deletePost)


export default router