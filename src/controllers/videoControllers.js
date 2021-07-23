
//Home
export const trending = (req, res) => res.send(`Home Page Video`);
export const search = (req, res) => res.send("Search");

//video routers
export const edit = (req, res) => res.send(`Edit`);
export const see = (req, res) => res.send("Watch");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => res.send("Delete Video");