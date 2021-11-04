const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text) => {
    const videoComments = document.querySelector(".video__comments ul"); //video__comments를 받아오고 그 안의 ul태그를 가져온다.
    const newComment = document.createElement("li");
    newComment.className = "video__comment";
    const icon = document.createElement("i");
    icon.className = "fa fa-comment";
    const span = document.createElement("span");
    span.innerText = ` ${text}`;
    newComment.appendChild(icon);
    newComment.appendChild(span);
    videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
    //돔을 만드는 것 역시 null에서 요소를 돔으로 만드는 것이 안됨. 이를 방지하기 위해
    const textArea = form.querySelector("textarea");
    //const btn = form.querySelector("button");

    event.preventDefault();
    const text = textArea.value;
    const videoId = videoContainer.dataset.id;
    if (text === "") {
        //아무런 입력이 없으면 아무런 행동도 하지 않도록
        return;
    }

    //fetch는 인자로 받은 주소로 요청한다. 이것이 만약 프론트에서 서버로의 요청이 되면 request의 일종이 되는 것이다.
    //또한 fetch에는 요청에 내용(정보)을 담을 수 있다. 이전에 html에서 form으로 부터 body를 받을 수 있었는데 여기서 직접 이 객체를 request에 넣어 만들어 보자.
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

if (form) {
    //로그인 했을 때만 태그를 보여주니 로그인 하지 않은 경우 존재하지 않은 태그를 가져와 addEventListener를 사용하는 것이니까 에러뜸. 이를 방지하기 위해
    form.addEventListener("submit", handleSubmit);
}
