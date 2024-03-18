const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/authGuard');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Comment.create({
      ...req.body,
      user_id: req.session.user_id, 
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;