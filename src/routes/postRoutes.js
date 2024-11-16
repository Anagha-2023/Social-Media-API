// src/routes/postRoutes.js

import express from 'express';
import { createPost, getAllPosts, updatePost, deletePost, likePost , dislikePost, addComment} from '../controllers/postController.js';
import authenticate from '../utils/auth.js';

const router = express.Router();

router.post('/',authenticate, createPost);
router.get('/', getAllPosts);
router.put('/:id',authenticate,updatePost);
router.delete('/:postId',authenticate, deletePost);
router.post('/:id/like',authenticate, likePost)
router.post('/:id/dislike',authenticate, dislikePost);
router.post('/:id/comment', authenticate, addComment)



export default router;
