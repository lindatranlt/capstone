console.log('potatooooo');


let button = document.getElementById("button");
let commentBtn = document.getElementById("comment");

function pressButton(evt){
    evt.preventDefault();
    window.location.href = "/home.html";
}

function getAndDisplayComments() {
    axios.get('http://localhost:4004/comments')
        .then(res => {
            let comments = res.data;
            let commentContainer = document.getElementById("comment-container");
            commentContainer.innerHTML = '';
            comments.forEach(comment => {
                let commentElement = document.createElement("div");
                commentElement.classList.add("comment");
                commentElement.innerHTML = `
                    <p>${comment.comment_p}</p>
                    <button class="delete-comment" data-comment-id="${comment.comment_id}">Delete</button>
                `;
                commentContainer.appendChild(commentElement);
            });
            
        })
        .catch(err => {
            console.error('Error fetching comments:', err);
        });
}


function postComment(newComment) {
    axios.post('http://localhost:4004/comments', { comment_p: newComment })
        .then(() => {
           //show all the comments after posting
            getAndDisplayComments();
    
        })
        .catch(err => {
            console.error('Error posting comment:', err);
        });
}


document.getElementById("comment").addEventListener("click", function () {
    const newComment = document.getElementById("new-comment").value;
    console.log(newComment);
    postComment(newComment);

    document.getElementById("new-comment").value = ""; 
    // clear comment input after posting the comment
});


getAndDisplayComments();

function deleteComment(commentId) {
    axios.delete(`http://localhost:4004/comments/${commentId}`)
        .then(() => {
            //post comments after delete
            getAndDisplayComments();
        })
        .catch(err => {
            console.error('Error deleting comment:', err);
        });
}


document.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("delete-comment")) {
        const commentId = evt.target.dataset.commentId;
        deleteComment(commentId);
    }
});


button.addEventListener("click", pressButton);
