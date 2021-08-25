export const localsMiddleware = (req, res, next) =>{
    res.locals.siteName = "CloneTube";
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUserName = req.session.user;
    next();
}