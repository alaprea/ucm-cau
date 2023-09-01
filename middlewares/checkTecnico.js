module.exports = (req,res,next) => {
  if (req.session.currentUser.rol === "Técnico") {
    next();
  }
  else res.redirect("/");
}