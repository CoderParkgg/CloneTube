// import
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

// multer
const s3 = new aws.S3({
    credentials: {
        accessKeyId: process.env.AWS_ID, //s3를 생성자로 만들어 준다. 옵션으로 credentials을 줘서 만들어 준다.
        secretAccessKey: process.env.AWS_SECRET, //주의할 점은 이렇게 만들어준 변수가 heroku에 들어있어야 한다.
    },
});

const s3ImageUploader = multerS3({
    s3: s3,
    bucket: "clonetubee/Image",
    acl: "public-read",
});

const s3VideoUploader = multerS3({
    s3: s3,
    bucket: "clonetubee/Vidoe",
    acl: "public-read",
});

//multer middleware
export const avatarUpload = multer({
    dest: "uploads/avatars/",
    limits: {},
    storage: s3ImageUploader,
});
export const videoUpload = multer({
    dest: "uploads/videos/",
    limits: {},
    storage: s3VideoUploader,
});

// middleware
export const localsMiddleware = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "CloneTube";
    res.locals.loggedInUser = req.session.user || {};
    next();
};

export const protectorMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
        return next();
    } else {
        req.flash("error", "Loging first");
        return res.redirect("/login");
    }
};

export const publicOnlyMiddleware = (req, res, next) => {
    if (!req.session.loggedIn) {
        return next();
    } else {
        req.flash("error", "Not authorized");
        return res.redirect("/");
    }
};
