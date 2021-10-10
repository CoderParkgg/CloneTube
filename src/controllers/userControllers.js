import User from "../models/User";
import Video from "../models/Video";
import bcrypt from "bcrypt";
import fetch from 'node-fetch';
import { render } from "pug";

//home
export const getJoin = (req, res) => res.render("join", {pageTitle :"Join" });
export const postJoin = async(req, res) => {
    try{
        const {name, username, email, password, passwordCheck, location } = req.body;
        const exist = await User.exists({$or : [{username /* : req.body.username*/}, {email}] });
        if(exist){
            return res.status(400).render("join", {pageTitle : "Join", errorMessage : "This username/email is already taken"});
        }
        if(password !== passwordCheck){
            return res.status(400).render("join", {pageTitle : "Join", errorMessage : "This Password confirmation does not match"});
        }
        await User.create({
            name,
            username,
            email,
            password,
            location,
        });
        res.redirect("/login");
    }catch(error){
        console.log(error.message);
        return res.render("join", {pageTitle : "Join", errorMessage : error._message});
    }
};

export const getLogin = (req, res) => {
    return res.render("login", {pageTitle : "Login"});
};
export const postLogin = async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username,});
    if(!user){
        return res.status(400).render("login", {pageTitle : "Login", errorMessage : "An account does not exists"});
    }
    if(user.socialOnly){
        return res.status(400).render("login", {pageTitle : "Login", errorMessage : "For your account, you has to login from github account"});
    }
    //check password is correct
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(400).render("login", {pageTitle : "Login", errorMessage : "Wrong password"});
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize"
    const config = {
        client_id : process.env.GH_CLIENT,
        allow_signup : false,
        scope : "read:User user:email"
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`
    return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
      client_id: process.env.GH_CLIENT,
      client_secret: process.env.GH_SECRET,
      code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await (await fetch(finalUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      })).json(); 

    if ("access_token" in tokenRequest){ //제대로 로그인 정보를 가져오면 존재할 것. 아니라면(에러가 난다면) 존재하지 않을 것.
        const apiUrl = "https://api.github.com"
        const {access_token} = tokenRequest;

        const userData = await (await fetch(`${apiUrl}/user`, { 
            headers : {
                Authorization: `token ${access_token}`,
                },
            })
        ).json();

        const emailData = await ( //받아오는 값은 email에 관련된 객체의 배열
            await fetch(`${apiUrl}/user/emails`, { 
                headers : {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();
        
        const emailObj = emailData.find( //Array.find(function) : 배열에서 함수를 만족하는 첫 번째 요소의 값을 반환합니다. 그런 요소가 없다면 undefined를 반환합니다.
            (email) => email.primary === true && email.verified === true //primary설정이 true인 객체 배열 요소
        );
        
        if(!emailObj){ //만약 유저가 이메일이 없다면 에러 메시지와 함께 다시 로그인 하라고 보낼것.(find()로 찾을 때 값이 없으면 undefined라서 false)
            return res.redirect("/login"); //af)이메일이 없기 때문에 오류 메시지 모이도록 고치기
        }
        //name이 null인 경우도 존재하더라. 만약 null인 경우 유저의 아이디로 이름이 정해지도록 만듦.
        let newUserName = userData.name;
        if(!userData.name){
            newUserName = userData.login;
        }

        let user = await User.findOne({ email: emailObj.email }); //깃헙으로 로그인한 유저가 이미 존재하는 유져인지 확인 
        if (!user) { //존재하지 않는 경우 데이터베이스에 저장하기.
            await User.create({
                avaterUrl : userData.avatar_url,
                name: newUserName,
                username: userData.login,
                email: emailObj.email,
                password: "",
                socialOnly: true,
                location: toString(userData.location),
            });
        }
        let newUser = await User.findOne({ email: emailObj.email });
        req.session.loggedIn = true;
        req.session.user = newUser;
        return res.redirect("/");
    }else { //토큰을 가져오던 중 오류가 나는 경우 오류 메시지와 함께 다시 로그인 페이지로 보내진다. 
        //af)로그인 중 오류가 났다고 표시하자.
        return res.redirect("/login");
    }
};

//user router
export const getEdit = (req, res) => {
    return res.render('user/edit-profile', {pageTitle : "edit-profile",});
}

export const postEdit = async (req, res) => {
    const { 
        session : {
            user : { _id , avatarUrl}
        },
        body : { name, email, username, location },
        file 
    } = req;
    const email_id = await User.findOne({email});
    const username_id = await User.findOne({username});
    if(email_id._id != _id){
        return res.render('user/edit-profile', {pageTitle : "edit-profile", errorMessageOfEmail : "email is already existed"});
    }
    if(username_id._id != _id){
        return res.render('user/edit-profile', {pageTitle : "edit-profile", errorMessageOfUsername : "username is already existed"});
    }
    const updatedUser = await User.findByIdAndUpdate( _id, {
        avatarUrl : file ? `/${file.path}` : avatarUrl ,
        name,
        email, 
        username, 
        location
    },
    {new : true})
    req.session.user = updatedUser;
    console.log(file, avatarUrl);
    return res.redirect('edit');
}

export const logout = (req, res) => {
    req.session.destroy(); //세션을 제거한다. 
    return res.redirect("/");
};

export const getChangePassword = (req, res) => {
    if(req.session.user.socialOnly){ 
        return res.redirect("/");
    }
    return res.render("user/change-password", {pageTitle : "change-password"})
}
export const postChangePassword = async (req, res) => {
    const {
        session: {
          user: { _id },
        },
        body: { oldPassword, newPassword, newPasswordConfirmation },
      } = req;
      const user = await User.findById(_id);
      const ok = await bcrypt.compare(oldPassword, user.password);
      if (!ok) {
        return res.status(400).render("user/change-password", {
          pageTitle: "Change Password",
          errorMessage: "The current password is incorrect",
        });
      }
      if (newPassword !== newPasswordConfirmation) {
        return res.status(400).render("users/change-password", {
          pageTitle: "Change Password",
          errorMessage: "The password does not match the confirmation",
        });
      }
      user.password = newPassword;
      await user.save();
      return res.redirect("/user/logout");
}

export const remove = (req, res) => res.send("Remove User");

export const see = async (req, res) => { //채널 페이지
    const {id} = req.params;
    const user = await User.findById(id).populate("videos");
    if(!user){
        return res.status(404).render("404", {pageTitle : "User Not Found."});
    }
    return res.render("user/profile", {pageTitle : `${user.name}`, user });
};
