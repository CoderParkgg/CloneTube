import "../scss/style.scss";

const nav_user = document.querySelector(".header__nav__user");
const nav_user_box = document.querySelector("#header__iconDev");
const deleteBtn = document.querySelector(".deleteVideo");


function keepHandler () {
    nav_user_box.classList.add("header__iconDev__show");
    if(nav_user_box.classList.contains("header__iconDev__hide")){
        nav_user_box.classList.remove("header__iconDev__hide")
    }
}

function deandler(){
    nav_user_box.classList.add("header__iconDev__hide");
    if(nav_user_box.classList.contains("header__iconDev__show"))
        nav_user_box.classList.remove("header__iconDev__show");
    
}

function userIconShowHandler () {
    nav_user_box.classList.add("header__iconDev__show");
    if(nav_user_box.classList.contains("header__iconDev__hide"))
        nav_user_box.classList.remove("header__iconDev__hide")
    
}

function userIconHideandler(){
    nav_user_box.classList.add("header__iconDev__hide");
    if(nav_user_box.classList.contains("header__iconDev__show")){
        nav_user_box.classList.remove("header__iconDev__show");
    }
}

function deleteAlert(){
    const ok = confirm("삭제하시겠습니까?");
    console.log(ok);
    if(!ok){
        console.log('1');
        window.location.reload();
    }
    if(ok)
        window.location.href = `${window.location.href}/delete`;
}

nav_user.addEventListener("mouseenter", userIconShowHandler);
nav_user.addEventListener("mouseleave", userIconHideandler);
nav_user_box.addEventListener("mouseenter", keepHandler);
nav_user_box.addEventListener("mouseleave", deandler);
deleteBtn.addEventListener("click", deleteAlert);