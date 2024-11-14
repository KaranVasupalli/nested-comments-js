document.addEventListener('DOMContentLoaded', () => {
  const commentsContainer = document.getElementById('comments-container');
  const initialComment = createCommentElement('John Doe', "Welcome! You can reply to the comments. But you can't delete the initial comment.", 'initial-profile.png', true);
  commentsContainer.appendChild(initialComment);

  document.getElementById('post-button').addEventListener('click', addComment);
  document.getElementById('reset-button').addEventListener('click', resetComments);
});

function addComment() {
  const commentText = document.getElementById('comment-text').value.trim();
  const username = document.getElementById('username-input').value.trim();
  const commentsContainer = document.getElementById('comments-container');

  if (commentText === '' || username === '') {
      alert('Please enter both username and comment');
      return;
  }

  const profileImages = [

      "https://images.unsplash.com/photo-1669475535925-a011d7c31d45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1669475535925-a011d7c31d45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww",
      "https://plus.unsplash.com/premium_photo-1673512198690-6439132f3187?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHByb2ZpbGUlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D"

     
  ];

  const randomImage = profileImages[Math.floor(Math.random() * profileImages.length)];
  const commentElement = createCommentElement(username, commentText, randomImage);
  commentsContainer.appendChild(commentElement);

  document.getElementById('comment-text').value = '';
  document.getElementById('username-input').value = '';
}

function createCommentElement(username, text, profileImage, isInitial = false) {
  const comment = document.createElement('div');
  comment.classList.add('comment');
  comment.innerHTML = `
      <div class="comment-header">
          <img src="https://plus.unsplash.com/premium_photo-1673512198690-6439132f3187?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHByb2ZpbGUlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D" alt="User Avatar" class="profile-img">
          <strong>${username}</strong>
      </div>
      <p class="comment-text">${text}</p>
      <div class="comment-buttons">
          <button onclick="replyToComment(this)">Reply</button>
          ${!isInitial ? '<button onclick="editComment(this)">Edit</button><button onclick="deleteComment(this)">Delete</button>' : ''}
      </div>
  `;
  return comment;
}

function replyToComment(button) {
  const parentComment = button.parentElement.parentElement;


  if (parentComment.querySelector('.comment-input')) return;

  
  const replyBox = document.createElement('div');
  replyBox.classList.add('comment-input');
  replyBox.innerHTML = `
      <input type="text" placeholder="Enter your username..." class="reply-username-input">
      <textarea placeholder="Write a reply..." class="reply-textarea"></textarea>
      <button onclick="submitReply(this)">post</button>
  `;

  parentComment.appendChild(replyBox);
}

function submitReply(button) {
  const profileImages = [
     
      
      "https://images.unsplash.com/photo-1669475535925-a011d7c31d45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1669475535925-a011d7c31d45?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww",
      "https://plus.unsplash.com/premium_photo-1673512198690-6439132f3187?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHByb2ZpbGUlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D"

     
  ];
  const replyText = button.previousElementSibling.value.trim();  
  const username = button.previousElementSibling.previousElementSibling.value.trim(); 
  if (replyText === '' || username === '') {
      alert('Please enter both username and reply');
      return;
  }

  const parentComment = button.parentElement.parentElement;
  const profileImage = profileImages[Math.floor(Math.random() * profileImages.length)]; 
  const replyElement = createCommentElement(username, replyText, profileImage);

  
  replyElement.style.marginLeft = '20px';
  parentComment.appendChild(replyElement);

  // Remove the reply input box after submitting
  button.parentElement.remove();
}

function editComment(button) {
  const comment = button.parentElement.parentElement;
  const commentTextElement = comment.querySelector('.comment-text');
  
 
  if (comment.querySelector('.edit-textarea')) return;


  const editTextarea = document.createElement('textarea');
  editTextarea.classList.add('edit-textarea');
  editTextarea.value = commentTextElement.innerText;

 
  comment.replaceChild(editTextarea, commentTextElement);

  
  const buttonsContainer = comment.querySelector('.comment-buttons');
  buttonsContainer.innerHTML = '';

 
  const saveButton = document.createElement('button');
  saveButton.innerText = 'Save';
  saveButton.onclick = () => saveEditedComment(comment, editTextarea, saveButton);
  buttonsContainer.appendChild(saveButton);
}

function saveEditedComment(comment, editTextarea, saveButton) {
  const newText = editTextarea.value.trim();
  if (newText === '') {
      alert('Comment cannot be empty');
      return;
  }

  
  const updatedCommentText = document.createElement('p');
  updatedCommentText.classList.add('comment-text');
  updatedCommentText.innerText = newText;

  comment.replaceChild(updatedCommentText, editTextarea);

  
  const buttonsContainer = comment.querySelector('.comment-buttons');
  buttonsContainer.innerHTML = `
      <button onclick="replyToComment(this)">Reply</button>
      <button onclick="editComment(this)">Edit</button>
      <button onclick="deleteComment(this)">Delete</button>
  `;
}

function deleteComment(button) {
  const comment = button.parentElement.parentElement;
  comment.remove();
}

function resetComments() {
  const commentsContainer = document.getElementById('comments-container');
  commentsContainer.innerHTML = '';

  const initialComment = createCommentElement('John Doe', "Welcome! You can reply to the comments. But you can't delete the initial comment.", 'initial-profile.png', true);
  commentsContainer.appendChild(initialComment);
}
