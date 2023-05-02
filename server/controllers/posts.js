import Post from '../models/Post.js'
import User from '../models/User.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

// Create Post
export const createPost = async (req, res) => {
	try {
		const { title, text } = req.body
		const user = await User.findById(req.userId)

		// Post with image
		if (req.files) {
			let fileName = Date.now().toString() + req.files.image.name
			const __dirname = dirname(fileURLToPath(import.meta.url))
			req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

			const newPostWithImage = new Post({
				username: user.username,
				title,
				text,
				imgUrl: fileName,
				author: req.userId
			})

			await newPostWithImage.save()
			await User.findOneAndUpdate(req.userId, {
				$push: { posts: newPostWithImage }
			})

			return res.json(newPostWithImage)
		}

		// Post without image

		const newPostWithoutImage = new Post({
			username: user.username,
			title,
			text,
			imgUrl: '',
			author: req.userId
		})

		await newPostWithoutImage.save()
		await User.findOneAndUpdate(req.userId, {
			$push: { posts: newPostWithoutImage }
		})

		return res.json(newPostWithoutImage)
	} catch (error) {
		res.json({ message: 'Something went wrong' })
	}
}

// Get All Posts
export const getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find().sort('-createdAt')
		const popularPosts = await Post.find().limit(5).sort('-views')
		if (!posts) {
			return res.json({ message: 'Posts not found' })
		}

		res.json({ posts, popularPosts })
	} catch (error) {
		res.json({ message: 'Something went wrong' })
	}
}