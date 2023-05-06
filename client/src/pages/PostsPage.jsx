import React, { useEffect, useState } from 'react';
import axios from "../utils/axios";
import PostItem from "../components/PostItem";

const PostsPage = () => {
	const [posts, setPosts] = useState([])
	const fetchMyPosts = async () => {
		try {
			const { data } = await axios.get('posts/user/me')
			setPosts(data)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		fetchMyPosts()
	}, [])

	return (
		<div className='w-1/2 mx-auto py-10 flex flex flex-col gap-10'>
			{posts && posts.map((post, i) => {
				return (
					<PostItem post={post} key={i}/>
				)
			})}
		</div>
	);
};

export default PostsPage;