import User from "../models/User";
import bcrypt from "bcrypt";

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
    //check if account exists
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).render("login", {pageTitle : "Login", errorMessage : "An account does not exists"});
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


//user router
export const edit = (req, res) => res.send(`edit`);
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Log out");
export const see = (req, res) => res.send("See User");
