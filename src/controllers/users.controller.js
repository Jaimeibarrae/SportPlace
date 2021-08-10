import User from "../models/User";
import passport from "passport";

export const renderSignUpForm = (req, res) => res.render("users/signup");

export const singup = async (req, res) => {
  let errors = [];
  const { name, ape,direccion, tel, email, password, confirm_password } = req.body;
  if (name.length>50){
    errors.push({text:"El nombre no puede ser tan largo"})
  }
  if (ape.length>50){
    errors.push({text:"El apellido no puede ser tan largo"})
  }
  if (name.length>50){
    errors.push({text:"La dirección no puede ser tan larga"})
  }
  if (isNaN(tel)){
    errors.push({text:"El campo telefono debe de ser numerico"})
  }
  if (password != confirm_password) {
    errors.push({ text: "Las contraseñas no coinciden" });
  }
  if (password.length < 6) {
    errors.push({ text: "La contraseña debe de ser mayor a 6 caracteres" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      ape,
      direccion,
      tel,
      email,
      password,
      confirm_password,
    });
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "El correo ya existe registrado");
      res.redirect("/users/signup");
    }else {
      // Saving a New User
      const rol=2;
      const newUser = new User({ name,ape,direccion, tel, email, password,rol});
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Estas registrado");
      res.redirect("/users/signin");
    }
  }
};

export const renderSigninForm = (req, res) => res.render("users/signin");


export const signin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/users/signin",
  failureFlash: true,
});


export const logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "Cerraste Sesión correctamente");
  res.redirect("/users/signin");
};
