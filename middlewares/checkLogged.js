module.exports = (req,res,next) => {
  if (req.session.currentUser) {
    res.locals.user = req.session.currentUser;
    next();
  }
  else 
    res.redirect("/user/login");
}