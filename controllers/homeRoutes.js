const withAuth = require('../utils/authGuard');
const {User, Blog, Comment} = require('../models')
const router = require('express').Router();

router.get('/login', (req, res) => {
  // Render the login page
  res.render('login', { title: 'Login' });
});


// Define a route handler for the root URL
router.get('/', async (req, res) => {
  try {

const blogData = await Blog.findAll({
  include: [{model: User, attributes: ['name']}]
})
const blogs = blogData.map(blog =>blog.get({plain: true}))
    res.render('homepage', { title: 'Main Page', blogs});
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
  
});
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{model: Blog}]
    })
    const user = userData.get({plain: true})
    res.render('profile', {
      user
    })
  } catch (error) {
    res.status(500).json(error)
  }
})
router.get('/blogs/:id', async( req, res) => {
  try {
    const blogdata = await Blog.findByPk(req.params.id, {
      include: [
        {model: User},
        {model: Comment},
      ]
    })
    const blog = blogdata.get({plain: true})
    res.render('blog', {
      blog, 
 
    })
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router;
