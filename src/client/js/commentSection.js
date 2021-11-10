const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const commentList = document.querySelectorAll(".video__comment");
const commentDeleteBtn = document.querySelectorAll(".video__comment-delete");

const videoId = videoContainer.dataset.id;
let index = 0;

// function
const deleteComment = async (event) => {
    await location.reload();
    event.target.parentNode.remove();
    await fetch(`/api/comment/${videoId}`, {
        method: "delete",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ id: event.target.dataset.commentid }),
    });
};

const addComment = (text) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.className = "video__comment";
    const icon = document.createElement("i");
    const newDeleteBtn = document.createElement("i");
    icon.className = "fa fa-comment";
    newDeleteBtn.innerText = "❌";
    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(newDeleteBtn);
    videoComments.prepend(newComment);

    newDeleteBtn.addEventListener("click", deleteComment);
};

// callback
const handleSubmit = async (event) => {
    //돔을 만드는 것 역시 null에서 요소를 돔으로 만드는 것이 안됨. 이를 방지하기 위해
    const textArea = form.querySelector("textarea");
    event.preventDefault();
    const text = textArea.value;
    if (text === "") {
        //아무런 입력이 없으면 아무런 행동도 하지 않도록
        return;
    }

    const { status } = await fetch(`/api/videos/${videoId}/comment`, {
        method: "POST",
        //header는 기본적으로 request의 정보를 담고 있다.
        headers: {
            "content-type": "application/json", //우리가 보내는 정보는 문자열화된 json이다는 것을 알려준다.
        },
        body: JSON.stringify({ text }),
    });
    textArea.value = "";
    if (status === 201) {
        //만약 요청이 제대로 되었다면 status의 값이 201이 되었을 것이다.
        addComment(text);
    }
};

const handleDelete = async (event) => {
    location.reload();
    const { status } = await fetch(`/api/comment/${videoId}`, {
        method: "delete",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({ id: event.target.dataset.commentid }),
    });
    location.reload();
};

// event listener
if (form) {
    form.addEventListener("submit", handleSubmit);
}

for (let i = 0; i < commentDeleteBtn.length; i++) {
    commentDeleteBtn[i].addEventListener("click", handleDelete);
}
