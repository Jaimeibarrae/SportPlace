import express from "express";
import exphbs from "express-handlebars";
import path from "path";
import session from "express-session";
import methodOverride from "method-override";
import flash from "connect-flash";
import passport from "passport";
import morgan from "morgan";
import MongoStore from "connect-mongo";

import { createAdminUser } from "./libs/createUser";
import config from "./config";

import indexRoutes from "./routes/index.routes";
import userRoutes from "./routes/users.routes";
import listpro from "./routes/adminpro.routes";
import agregarcategoria from  "./routes/adminpro.routes";
import eliminarproducto from  "./routes/adminpro.routes";
import eliminarcategoria from  "./routes/adminpro.routes";
import updateProducto from  "./routes/adminpro.routes";
import renderedit from "./routes/adminpro.routes";
import list from "./routes/adminpro.routes";
import ProductController from "./routes/products.routes"
import "./config/passport";
import multer from "multer";

// Initializations
const app = express();
createAdminUser();

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/img/uploads') ,
  filename: (req, file, cb) => {
    cb(null,  file.originalname);
  }
});
// settings
app.set("port", config.PORT);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: config.MONGODB_URI }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(multer({
  storage,
  dest: path.join(__dirname, 'public/img/uploads')
}).single('image'));

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
 
  if (res.locals.user != null){
    res.locals.rol = req.user.rol || null;
    res.locals.name = req.user.name || null;
    var rol=res.locals.user.rol || null;
    console.log(rol);
    if(rol==1){
      res.locals.Admin=true;
    }else{
      if(rol==2){
        res.locals.Admin=null;
      }
    }
  }
  
  next();
});

// routes
app.use(indexRoutes);
app.use(userRoutes);
app.use(ProductController);
app.use(listpro);
app.use(list);
app.use(updateProducto);
app.use(agregarcategoria);
app.use(eliminarproducto);
app.use(eliminarcategoria);
app.use(renderedit);


// static files
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.render("404");
});

export default app;
