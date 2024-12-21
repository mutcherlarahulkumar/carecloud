const express = require('express');
const router = express.Router();
const { Post } = require('../models/Community');

router.post('/post', async (req, res) => {
    try {
        const { title, content, userId } = req.body;
        
        const post = new Post({
            title,
            content,
            author: userId
        });

        await post.save();
        res.status(201).json({ message: 'Post created successfully', post });
    } catch (error) {
        res.status(500).json({ error: 'Error creating post' });
    }
});

router.post('/post/:postId/comment', async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId, content } = req.body;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        post.comments.push({ user: userId, content });
        await post.save();

        res.status(201).json({ message: 'Comment added successfully', post });
    } catch (error) {
        res.status(500).json({ error: 'Error adding comment' });
    }
});

router.delete('/post/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        if (post.author.toString() !== userId) {
            return res.status(403).json({ error: 'You are not authorized to delete this post' });
        }

        // Delete the post
        await post.remove();
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting post' });
    }
});

router.delete('/post/:postId/comment/:commentId', async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        
        const comment = post.comments.id(commentId);
        if (!comment) return res.status(404).json({ error: 'Comment not found' });

        
        if (comment.user.toString() !== userId) {
            return res.status(403).json({ error: 'You are not authorized to delete this comment' });
        }

        
        comment.remove();
        await post.save();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting comment' });
    }
});

module.exports = router;

