import React from 'react';

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
			<div className='flex text-xs p-2 text-gray-300 hover:bg-gray-800 hover:text-white'>
				{post.title}
			</div>

		</div>
	);
};

export default PopularPosts;