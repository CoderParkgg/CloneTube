import multer from 'multer'

export const localsMiddleware = (req, res, next) =>{
    res.locals.siteName = "CloneTube";
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {}; //"||"연산은 앞에서부터 true인 값을 반환한다. 
    next();
}

//login 여부 확인하고 안되어있으면 로그인 페이지로 보내기. 로그인이 필요한 페이지에 접근을 막는다.(edit페이지, 로그아웃)
export const protectorMiddleware = (req, res, next) => { 
    if(req.session.loggedIn){
        return next();
    }else{
        return res.redirect("/login");
    }
}

//login여부 확인하고 로그인 되어있으면 홈으로 보내준다. 로그인 한 유저가 접근하면 안되는 페이지에 지정해주자. (로그인 페이지, 깃허브 로그인, 회원가입 페이지)
export const publicOnlyMiddleware = (req, res, next) => {
    if(!req.session.loggedIn){
        return next();
    }else{
        return res.redirect("/");
    }
}

export const avatarUpload = multer({ dest: "uploads/avatars", 
limits : {fileSize : 300000} });

export const videoUpload = multer({ dest: "uploads/videos", 
limits : {fileSize : 10000000} });