import Video from "../models/Video"; //mhdel 수입하기.

//Home

export const home = async(req, res) => {
    const videos = await Video.find({})
    console.log(videos);
    return res.render("home", { pageTitle : "Home", videos: []})
};
export const search = (req, res) => res.send("Search");

//video routers
export const getEdit = (req, res) =>{
    const { id } = req.params;
    return res.render("edit", {pageTitle : `Editing :`});
};
export const postEdit = (req, res) =>{
    const { id } = req.params;
    return res.redirect(`/videos/${id}`);
};
export const watch = (req, res) => {
    const { id } = req.params; // == const id = req.params.id
    return res.render("watch", {pageTitle : `watching `});
};
export const deleteVideo = (req, res) => res.send("Delete Video");


export const getUpload = (req, res) => {    
    return res.render("upload", {pageTitle : "Upload Video"});
};
export const postUpload = (req, res) => {
    const {title, description, hashtag} = req.body;
    const video = new Video({
        title, //title : title 과 같음. 여기서 후자는 위의 title의 값을 뜻함.
        description,
        createdAt : Date.now(),
        meta:{
            views:0,
            rating:0,
        }
    });

    return res.redirect("/");
};