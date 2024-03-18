const commentFormHandler = async (event)  => {
event.preventDefault()
const comment = document.querySelector('#submit-btn').value
const blog_id = document.querySelector('#blog_id').value
const response = await fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify({comment, blog_id}),
    headers: {
    'Content-Type': 'application/json',
}
})

if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to add comment');
  }
}
document.querySelector('#comment-form').addEventListener('submit', commentFormHandler)