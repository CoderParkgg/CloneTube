import Video from "../models/Video"; //model 수입하기.

//Home

export const home = async(req, res) => {
   try {
       const videos = await Video.find({})
       return res.render("home", { pageTitle : "Home", videos})
    }catch{
    }
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
export const postUpload = async (req, res) => {
    const {title, description, hashtags} = req.body;
    // const video = new Video({ //model에는 타입만 지정했지만, 여기서는 직접 값을 넣어준다. 
    //     title, //title : title 과 같음. 여기서 후자는 위의 title의 값을 뜻함.
    //     description,
    //     createdAt : Date.now(), //Date.now는 1970년 이래로 밀리세컨드 초로 제공됨.
    //     hashtags:hashtags.split(",").map(word => `#${word}`),
    //     meta:{
    //         views:0,
    //         rating:0,
    //     }
    // });
    // await video.save();
    await Video.create({ //model에는 타입만 지정했지만, 여기서는 직접 값을 넣어준다. 
        title, //title : title 과 같음. 여기서 후자는 위의 title의 값을 뜻함.
        description,
        createdAt : Date.now(), //Date.now는 1970년 이래로 밀리세컨드 초로 제공됨.
        hashtags:hashtags.split(",").map(word => `#${word}`),
        meta:{
            views:0,
            rating:0,
        }
    });
    return res.redirect("/");
};