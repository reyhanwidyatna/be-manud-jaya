const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ status: 'fail', message: 'Unauthorized: Missing token' });
  next();
};

export default isAuthenticated;
