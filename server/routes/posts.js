import { Router } from 'express'
import { checkAuth } from "../utils/checkAuth.js";
import { createPost, deletePost, getAllPosts, getMyPosts, getPostById } from "../controllers/posts.js";

const router = new Router()

// Create Post
// http://localhostL3002/api/posts
router.post('/', checkAuth, createPost)


// Get All Posts
// http://localhostL3002/api/posts
router.get('/', getAllPosts)

// Get Post by ID
// http://localhostL3002/api/posts/:id
router.get(`/:id`, getPostById)

// Get Mt Posts
// http://localhostL3002/api/posts/user/me
router.get(`/user/me`, checkAuth, getMyPosts)

// Delete Post
// http://localhostL3002/api/posts/:id
router.delete('/:id', checkAuth, deletePost)


export default router