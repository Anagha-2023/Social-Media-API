import mongoose from "mongoose";
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log(req.body)
    const post = new Post({
      title,
      content,
      userId: req.user.userId
    });
    console.log(post);
    
    await post.save();
    return res.status(201).json({post});
  } catch (error) {
    return res.status(400).json({message:error.message})
  }
}

export const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const posts = await Post.find().skip((page-1) * limit).limit(limit).populate('userId', 'username');
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(400).json({ message:error.message });
  }
}

export const updatePost = async (req, res) => {
  try {
    const {id} = req.params;
    const {title, content} = req.body;
    const post = await Post.findById(id);

    if(!post) {
      return res.status(404).json({mesage:'Post not found'});
    }
    if(post.userId.toString() !== req.user.userId ) {
      return res.status(403).json({message:'You are not authorized to update this post'});
    }
    post.title = title;
    post.content = content;
    await post.save();
    return res.status(200).json(post);
  } catch (error) {
    return res.status(400).json({message:error.message});
  }
}

export const deletePost = async (req, res) => {
  try {
    const {postId} = req.params;
    console.log("Req.params",req.params)
    const post = await Post.findById((postId));
    console.log(post)
    if(!post) {
      return res.status(404).json({message:'Post not found'});
    }

    if(post.userId.toString() !== req.user.userId) {
      return res.status(403).json({message:'You are not authorized to delete this post'});
    }
    await post.deleteOne();
    return res.status(204).json({message:'Post Deleted'});
  } catch (error) {
    return res.status(400).json({message:error.message})
  }
}

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Toggle like: Increment likes and decrement dislikes if previously disliked
    if (post.likes < 1) {
      post.likes += 1;
      post.dislikes = Math.max(post.dislikes - 1, 0); // Ensure dislikes are not negative
    }

    await post.save();
    return res.status(200).json({ likes: post.likes, dislikes: post.dislikes });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const dislikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Toggle dislike: Increment dislikes and decrement likes if previously liked
    if (post.dislikes < 1) {
      post.dislikes += 1;
      post.likes = Math.max(post.likes - 1, 0); // Ensure likes are not negative
    }

    await post.save();
    return res.status(200).json({ likes: post.likes, dislikes: post.dislikes });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

