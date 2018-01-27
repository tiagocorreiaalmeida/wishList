export default (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.error(401, "not-logged");
};
