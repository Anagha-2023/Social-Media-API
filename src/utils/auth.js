import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if(!token) {
    return res.status(401).json({message:'Token not found'});
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = {userId:decoded.userId};
    next();
  } catch (error) {
    return res.status(403).json({message:'Failed to authenticate User'});
  }
}

export default authenticate;