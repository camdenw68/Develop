const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-name').value.trim();
  const content = document.querySelector('#blog-desc').value.trim();

  if (title && content) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create blog');
    }
  }
};

const deleteButtonHandler = async (event) => {
  console.log('Delete button clicked'); // Check if the event listener is being triggered
  
  if (event.target.classList.contains('btn-danger')) {
    console.log('Delete button clicked:', event.target.dataset.id); // Check if the correct blog ID is being retrieved
    
    const blogId = event.target.dataset.id;

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert('Failed to delete the blog post.');
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  }
};

const blogList = document.querySelector('.blog-list') 
if (blogList) {
  blogList.addEventListener('click', deleteButtonHandler);
}

document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);
