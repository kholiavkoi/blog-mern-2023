import React, { useCallback, useEffect } from 'react';
import Moment from "react-moment";
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import axios from "../utils/axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../redux/features/post/postSlice";
import { toast } from "react-toastify";

const PostPage = () => {
	const [post, setPost] = React.useState(null)
	const params = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { user } = useSelector(state => state.auth)

	const removePostHandler = () => {
		dispatch(deletePost(params.id))
		toast('Post was deleted')
		navigate('/posts')
	}

	const fetchPost = useCallback(async () => {
		const { data } = await axios.get(`/posts/${params.id}`)
		setPost(data)
	}, [params.id])

	useEffect(() => {
		fetchPost()
	}, [fetchPost])

	if (!post) {
		return (
			<div className='text-xl text-center text-white py-10'>Loading...</div>
		)
	}


	return (
		<div>

			<button className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
				<Link to='/'>Back</Link>
			</button>

			<div className='flex gap-10 py-8'>
				<div className='w-2/3'>
					<div className='flex flex-col basis-1/4 flex-grow'>
						<div className={post.imgUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'}>
							{post.imgUrl && (
								<img src={`http://localhost:3002/${post.imgUrl}`} alt=""
									 className='object-cover w-full' />
							)}
						</div>
					</div>

					<div className='flex justify-between items-center pt-2'>
						<div className="text-xs text-white opacity-50">{post.username}</div>
						<div className="text-xs text-white opacity-50">
							<Moment date={post.createdAt} format='D MMM YYYY' />
						</div>
					</div>
					<div className="text-white text-xl">{post.title}</div>
					<p className='text-white opacity-60 text-xs pt-4'>{post.text}</p>

					<div className='flex items-center gap-3 mt-2 justify-between'>
						<div className='flex gap-3 mt-4'>
							<button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
								<AiFillEye /> <span>{post.views}</span>
							</button>
							<button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
								<AiOutlineMessage /> <span>{post.comments.length}</span>
							</button>
						</div>

						{
							user?._id === post.author && (
								<div className='flex gap-3 mt-4'>
									<Link to={`/${params.id}/edit`} className='flex items-center justify-center gap-2 text-white opacity-50'>
										<AiTwotoneEdit />
									</Link>
									<button
										onClick={removePostHandler}
										className='flex items-center justify-center gap-2 text-white opacity-50'>
										<AiFillDelete />
									</button>
								</div>
							)
						}
					</div>
				</div>
				<div className='w-1/3'>Comments</div>
			</div>
		</div>
	);
};

export default PostPage;