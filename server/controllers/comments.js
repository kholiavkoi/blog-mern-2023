import Comment from '../models/Comment.js'
import Post from '../models/Post.js'

// Create Comment
export const createComment = async (req, res) => {
	try {
		const { postId, comment } = req.body

		if (!comment) return res.json({ message: 'Comment cant be empty' })

		const newComment = new Comment({ comment })
		await newComment.save()

		await Post.findByIdAndUpdate(postId, {
			$push: { comments: newComment._id }
		})

		res.json(newComment)
	} catch (e) {
		res.json({ message: 'Something went wrong' })
	}
}

