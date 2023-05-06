import React from 'react';
import { Link } from "react-router-dom";

const PopularPosts = ({ post }) => {

	if (!post) {
		return (
			<div className='text-xl text-center text-white py-10'>
				No popular posts.
			</div>
		)
	}

	return (
		<div className='bg-gray-600 my-1'>
			<Link to={`${post._id}`} className='flex text-xs p-2 text-gray-300 hover:bg-gray-800 hover:text-white'>
				{post.title}
			</Link>

		</div>
	);
};

export default PopularPosts;