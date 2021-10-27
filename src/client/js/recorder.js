//import regeneratorRuntime from "regenerator-runtime"; : main.js에 import 문 넣기

const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
    const a = document.createElement("a");
    a.href = videoFile;
    a.download = "MyRecording.mp4"//a태그에서 download 속성은 사용자에게 url을 통해 어디로 보내주는 것이 아니라 url을 저장하게 해준다. 값으로 받은 것을 파일 이름으로 하여 저장한다.
    a.click();//링크 걸린 a 태그를 직접 누르는 것과 같은 효과를 준다. 
}

const handleStop = () => {
    startBtn.innerText = "Download Recording"
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleDownload);
    recorder.stop();
}

const handleStart = () => {
    startBtn.innerText = "Stop recording"
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);
    recorder = new MediaRecorder(stream); //MediaRecorder은 미디어를 녹화(녹은)할 수 있는 함수들을 제공한다. stream을 인자로 하는 생성자를 만들 경우 리코더 객체를 반환하여 준다. 
    recorder.ondataavailable = (event) => {
        videoFile = URL.createObjectURL(event.data); //브라우저 메모리에서만 가능한 URL을 만들어 준다. 
        video.srcObject = null;
        video.src = videoFile; //video 태그(dom)에 만든 주소를 주면 그 파일이 열린다. 
        video.loop = true; //video에도 loop 설정이 존재한다.
        video.play();
    } 
    //MediaRecorder에서 발생하는 event를 잡으려면 이처럼 ondataavailable handler를 사용해야 한다. 
    //ondataavailable로 반환한 객체에는 다양한 것들이 존재하는데 우리가 사용할 비디오는 data 프로퍼티에 존재한다. (event.data)
    //녹화한 것(event.data)을 주소로 바꿔주는 것이 URL.createObjectURL(event.data). 참고로 이 주소는 서버상에 존재하지 않는 주소이다. 이곳으로 들어가면 에러뜸. 이것은 브라우저상에서 존재하는 파일의 주소라고 생각하면 된다. 
    //이렇게 바꾼 주소를 이용하여 저장하거나 재생하는 등의 작업을 할 수 있다. 
    recorder.start();   
}

const init = async() => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio : false,
        video : {width:500, height:400}
    });
    //video
    video.srcObject = stream;
    video.play();
}

init();

startBtn.addEventListener("click", handleStart);