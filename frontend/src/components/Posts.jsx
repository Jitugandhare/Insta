import React from 'react';
import Post from './Post';
import { useSelector } from 'react-redux';

const Posts = () => {
    const { posts } = useSelector(store => store.post);
    return (
        <div>
            {Array.isArray(posts) && posts.length > 0 ? (
                posts.map(post => <Post key={post._id} post={post} />)
            ) : (
                <p>No posts available</p> 
            )}
        </div>
    );
};

export default Posts;
