let videos = [
    {
        title : "First Video",
        rating : 5,
        comments : 2,
        createdAt : "2 minutes ago",
        views : 69,
        id : 1
    },
    {
        title : "Second Video",
        rating : 5,
        comments : 2,
        createdAt : "2 minutes ago",
        views : 69,
        id : 2
    },
    {
        title : "Third Video",
        rating : 5,
        comments : 2,
        createdAt : "2 minutes ago",
        views : 69,
        id : 3
    },
];
//Home
export const trending = (req, res) => res.render("home", { pageTitle : "Home", videos: videos});
export const search = (req, res) => res.send("Search");

//video routers
export const getEdit = (req, res) =>{
    const { id } = req.params; // == const id = req.params.id
    const video = videos[id - 1];
    return res.render("edit", {pageTitle : `Editing : ${video.title}`, video});
};
export const postEdit = (req, res) =>{
    const { id } = req.params;
    videos[id - 1].title = req.body.title;     
    return res.redirect(`/videos/${id}`);
};
export const watch = (req, res) => {
    const { id } = req.params; // == const id = req.params.id
    const video = videos[id - 1];
    return res.render("watch", {pageTitle : `watching ${video.title}`, video});
};
export const deleteVideo = (req, res) => res.send("Delete Video");


export const getUpload = (req, res) => {    
    return res.render("upload", {pageTitle : "Upload Video"});
};
export const postUpload = (req, res) => {
    const newVideo = {
        title : req.body.title,
        rating : 0,
        comments : 0,
        createdAt : "just now",
        views : 0,
        id : video.length + 1
    }
    video.push(newVideo);
    return res.redirect("/");
};