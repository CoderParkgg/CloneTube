const fakeUser = {
    name: 'Park',
    loggedIn: true,

}
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
export const trending = (req, res) => res.render("home", { pageTitle : "Home", fakeUser: fakeUser, videos: videos});
export const search = (req, res) => res.send("Search");

//video routers
export const getEdit = (req, res) =>{
    const { id } = req.params; // == const id = req.params.id
    const video = videos[id - 1];
    return res.render("edit", {pageTitle : `Editing : ${video.title}`, fakeUser: fakeUser, video});
};
export const postEdit = (req, res) =>{
    const { id } = req.params;

    return res.redirect(`/videos/${id}`);
};
export const watch = (req, res) => {
    const { id } = req.params; // == const id = req.params.id
    const video = videos[id - 1];
    return res.render("watch", {pageTitle : `watching ${video.title}`, fakeUser: fakeUser, video});
};
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => res.send("Delete Video");