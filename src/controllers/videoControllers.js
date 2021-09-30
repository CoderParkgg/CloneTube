import Video from "../models/Video"; //model 수입하기.
//import {formatHashtags} from "../models/Video"; //함수를 사용한 경우

//Home

export const home = async(req, res) => {
   try {
       const videos = await Video.find({})
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
    return res.render("search", {pageTitle : "Search", videos});
};

//video routers

export const getEdit = async(req, res) =>{
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.status(404).render("404", { pageTitle : "Video not found."})
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
    const { id } = req.params; // == const id = req.params.id
    const video = await Video.findById(id);
    if(video === null){
        return res.render("404", {pageTitle : "Video not found."})
    }
    return res.render("video/watch", {pageTitle : `watching `, video});
};


export const getUpload = (req, res) => {    
    return res.render("upload", {pageTitle : "Upload Video"});
};
export const postUpload = async (req, res) => {
    const {title, description, hashtags} = req.body;
    try {
        await Video.create({ //model에는 타입만 지정했지만, 여기서는 직접 값을 넣어준다. 
            title, //title : title 과 같음. 여기서 후자는 위의 title의 값을 뜻함.
            description,
            hashtags : Video.formatHashtags(hashtags)
        });
        console.log(Video);
        return res.redirect("/");
    }catch(error){
        console.log(error.message);
        return res.render("upload", {pageTitle : "Upload Video", errorMessage : error._message});
    }
};

export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
};
