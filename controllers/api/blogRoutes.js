const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/authGuard');

router.post('/', async (req, res) => {
    try {
      const blogData = await Blog.create({...req.body, user_id: req.session.user_id});
      res.status(200).json(blogData)
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const blogId = req.params.id;
      const userId = req.session.user_id;
  
     
      const blog = await Blog.findOne({
        where: {
          id: blogId,
          user_id: userId
        }
      });
  
      if (!blog) {
        // If the blog post does not exist or does not belong to the user, return a 404 status
        return res.status(404).json({ message: 'Blog post not found or unauthorized.' });
      }
  
      // Delete the blog post from the database
      await Blog.destroy({
        where: {
          id: blogId
        }
      });
  
      // Send a success response
      res.status(200).json({ message: 'Blog post deleted successfully.' });
    } catch (err) {
      // Handle any errors
      console.error('Error deleting blog post:', err);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });
  

module.exports = router