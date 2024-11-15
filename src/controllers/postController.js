import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = new Post({
      title,
      content,
      userId: req.user.userId
    });
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
    const {id} = req.params;
    const post = await Post.findById(id);

    if(!post) {
      return res.status(404).json({message:'Post not found'});
    }

    if(post.userId.toString() !== req.user.userId) {
      return res.status(403).json({message:'You are not authorized to delete this post'});
    }
    await post.delete();
    return res.status(204).json({message:'Post Deleted'});
  } catch (error) {
    return res.status(400).json({message:error.message})
  }
}

export const likePost = async (req, res) => {
  try {
    const {id} = req.params;
    const post = Post.findById(id);
    if(!post) {
      return res.status(404).json({message:'Post not found'})
    }
    post.likes+=1;
    await post.save();
    return res.status(200).json({likes: post.likes});
  } catch (error) {
    return res.status(400).json({message:error.message})
  }
}