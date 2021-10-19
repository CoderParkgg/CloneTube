import Video from "../models/Video"; //model 수입하기.
import User from "../models/User"; //model 수입하기.

//Home

export const home = async(req, res) => {
   try {
       const videos = await Video.find({}).populate("owner");
       return res.render("home", { pageTitle : "Home", videos});
    }catch{
    }
};

export const search = async(req, res) => {
    let videos = [];
    const {keyword} = req.query
    if (keyword){
        videos = await Video.find({
            title : {$regex : new RegExp(keyword, "i")}
            //title : {$regex : new RegExp(`^${keyword}`, "i")} //keyword로 시작하는 것
            //title : {$regex : new RegExp(`${keyword}$`, "i")} //keyword로 끝나는 것
        });
    }
    return res.render("search", {pageTitle : "Search", videos, keyword});
};

//video routers

export const getEdit = async(req, res) =>{
    const { id } = req.params;
    const {user : {_id}} = req.session;
    const video = await Video.findById(id);
    if(!video){
        return res.status(404).render("404", { pageTitle : "Video not found."})
    }
    if(String(video.owner) !== String(_id)){
        return res.status(403).redirect("/");
    }
    return res.render("edit", { pageTitle : `Editing :${video.title}`, video});
};
export const postEdit = async (req, res) =>{
    const { id } = req.params;
    const { title, description, hashtags} = req.body;
    const video = await Video.exists;
    if(!video){
        return res.status(404).render("404", { pageTitle : "Video not found."})
    }
    Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags : Video.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
};

export const watch = async (req, res) => {
    const { id } = req.params; 
    const video = await Video.findById(id).populate("owner");
    console.log(video)
    if(video === null){
        return res.render("404", {pageTitle : "Video not found."})
    }
    return res.render("video/watch", {pageTitle : `watching `, video});
};


export const getUpload = (req, res) => {    
    return res.render("upload", {pageTitle : "Upload Video"});
};
export const postUpload = async (req, res) => {
    const {user : {_id}} = req.session;
    const fileUrl = req.file.path
    const {title, description, hashtags} = req.body;
    try {
        const newVideo = await Video.create({ 
            fileUrl,
            title,
            owner : _id,
            description,
            hashtags : Video.formatHashtags(hashtags)
        });
        const user = await User.findById(_id);
        user.videos.push(newVideo.id);
        user.save(); //유저의 정보를 저장함. 위에서 고쳤기 때문에 사용해줘야 update된 내용이 들어간다.
        return res.redirect("/");
    }catch(error){
        console.log(error.message);
        return res.render("upload", {pageTitle : "Upload Video", errorMessage : error._message});
    }
};

export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    const {user : {_id}} = req.session;
    const video = await Video.findById(id);
    if(!video){
        return res.status(404).render("404", {pageTitle : "Video not found. "})
    }
    if(String(video.owner) !== String(_id)){
        return res.status(403).redirect("/");
    }
    //await Video.findByIdAndDelete(id);
    return res.redirect("/");
};

export const registerView = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.status(404);
    }
    video.meta.views = video.meta.view + 1;
    await video.save();
    res.status(200);
}