import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";

export const home = async (req, res) => {
    const videos = await Video.find({})
        .sort({ createdAt: "desc" })
        .populate("owner");
    return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id)
        .populate("owner")
        .populate("comments");
    if (!video) {
        return res.render("404", { pageTitle: "Video not found." });
    }
    console.log(video);
    return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
    const { id } = req.params;
    const {
        user: { _id },
    } = req.session;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    if (String(video.owner) !== String(_id)) {
        req.flash("error", "Not authorized");
        return res.status(403).redirect("/");
    }
    return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

export const postEdit = async (req, res) => {
    const {
        user: { _id },
    } = req.session;
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({ _id: id });
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    if (String(video.owner) !== String(_id)) {
        req.flash("error", "Not authorized");
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });
    req.flash("success", "Changes saved");
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
    const {
        user: { _id },
    } = req.session;
    const { video, thumb } = req.files;
    console.log(video, thumb);
    const { title, description, hashtags } = req.body;
    try {
        const newVideo = await Video.create({
            title,
            description,
            fileUrl: video[0].path,
            thumbUrl: thumb[0].path,
            owner: _id,
            hashtags: Video.formatHashtags(hashtags),
        });
        const user = await User.findById(_id);
        user.videos.push(newVideo._id);
        user.save();
        return res.redirect("/");
    } catch (error) {
        console.log(error);
        return res.status(400).render("upload", {
            pageTitle: "Upload Video",
            errorMessage: error._message,
        });
    }
};

export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    const {
        user: { _id },
    } = req.session;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    if (String(video.owner) !== String(_id)) {
        req.flash("error", "Not authorized");
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
};

export const search = async (req, res) => {
    const { keyword } = req.query;
    let videos = [];
    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(`${keyword}$`, "i"),
            },
        }).populate("owner");
    }
    return res.render("search", { pageTitle: "Search", videos });
};

export const registerView = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.sendStatus(404);
    }
    video.meta.views = video.meta.views + 1;
    await video.save();
    return res.sendStatus(200);
    //status()만 한 경우 상태를 적기만 한 것. 즉 render이나 send 등의 브라우저로 직접 보내는 작업이 없기 때문에 제대로 보내지지 않음.
    //상태만 보내야 한다면 sendStatus()를 사용하자.
};

export const createComment = async (req, res) => {
    const {
        params: { id },
        body: { text },
        session: { user },
    } = req;
    const video = await Video.findById(id);
    if (!video) {
        return res.sendStatus(404);
    }
    const comment = await Comment.create({
        text,
        owner: user._id,
        video: video._id,
    });
    // video.comments.

    video.comments.push(comment._id);
    video.save(); //video는 값을 가져와 상수에 넣은 것이다. 즉 이 상수의 값을 바꾼다고 해서 데이터베이스의 값이 변하는 것이 아니다. 그러므로 이것을 데이터베이스에 저장시켜 데이터베이스의 값을 업데이트 시켜야 한다.

    return res.sendStatus(201);
};

export const deleteComment = async (req, res) => {
    let videoCommentIndex;
    const videoId = req.params.id;
    const commentId = req.body.id;
    const comment = await Comment.findById(commentId);
    const video = await Video.findById(videoId);
    if (!comment) {
        // console.log("comment not found");
        return res.sendStatus(404);
    }
    if (!video) {
        // console.log("video not found");
        return res.sendStatus(404);
    }
    await Comment.findByIdAndDelete(commentId);
    // console.log(Array.isArray(video.comments));
    videoCommentIndex = video.comments.indexOf(commentId);
    if (videoCommentIndex === -1) {
        // console.log("video Index nt found");
        return res.sendStatus(404);
    }
    // console.log(videoCommentIndex);
    // console.log(video.comments[videoCommentIndex]);
    video.comments = video.comments.splice(Number(videoCommentIndex), 1);
    //console.log(video.comments);
    //video.save();
    console.log("saved");
    return res.sendStatus(200);
};
