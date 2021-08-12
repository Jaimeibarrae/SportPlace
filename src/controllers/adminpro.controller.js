
import Categoria from "../models/Categoria";
import Producto from "../models/Adminproduct";

export const listpro =  async (req, res) => {

  Producto.find((err, productos) => {
    Categoria.find((err2, docs) =>{
      if (!err && !err2) {
          res.render("adminpro/listpro", {
              produlist: productos,
              list: docs,
          });
      }
      else {
          console.log('Error in retrieving Categoria list :' + err);
      }
  }).lean();}).lean();

};





//export const mostrarcategorias = async ()=>{
 // const categorias = await Categoria.find();
  //console.log(categorias);
  //res.render('adminpro/listpro', categorias);
//};

export const agregarcategoria = async (req, res) => {
  const {namecategoria} = req.body;
    const namecategorias = await Categoria.findOne({ namecategoria: namecategoria });
    if (namecategorias) {
      req.flash("error_msg", "La categoria ya existe");
      res.redirect("adminpro/listpro");
    } else {
      const categoria = new Categoria(req.body);
      await categoria.save();
      req.flash("success_msg", "La categoria se agrego exitosamente");
      res.redirect("adminpro/listpro");
    }
  };

  export const eliminarcategoria =  async (req, res) => {
    await Categoria.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "La Categoria se elimino correctamente");
    res.redirect("/adminpro/listpro");
  };
 

  export const eliminarproducto =  async (req, res) => {
    await Producto.findByIdAndRemove(req.params.id);
    req.flash("success_msg", "El producto se elimino correctamente");
    res.redirect("/adminpro/listpro");
  };
  export const subirproduct = async  (req, res) => {
  
    const producto = new Producto();
    producto.NombreProducto = req.body.NombreProducto;
    producto.description = req.body.description;
    producto.filename = req.file.filename;
    producto.path = '/img/uploads/' + req.file.filename;
    producto.originalname = req.file.originalname;
    producto.mimetype = req.file.mimetype;
    producto.precio = req.body.precio;
    producto.estado = req.body.estado;
    producto.size = req.file.size;
    producto.Categorias = req.body.Categorias;
    producto.cantidad = req.body.cantidad;
    
    //const namecategorias = await Categoria.findOne({ namecategoria: req.body.Categorias });
    //if (namecategorias){
    //  console.log(namecategorias)
    //  await Categoria.updateOne({Estado: true});
    //}
    await producto.save();
    req.flash("success_msg", "El producto se guardo exitosamente");
    res.redirect("adminpro/listpro");
  };

  
  export const updateProducto = async (req, res) => {

   const id = req.params.id;
   const description = req.body.description;
   const precio = req.body.precio;
   const cantidad = req.body.cantidad;
   
   await Producto.findByIdAndUpdate(id, { description: description, precio: precio, cantidad: cantidad });
   req.flash("success_msg", "El producto se actualizo exitosamente");
   Producto.find((err, productos) => {
    Categoria.find((err2, docs) =>{
      if (!err && !err2) {
          
          res.render("adminpro/listpro", {
              produlist: productos,
              list: docs,
          });
      }
      else {
          console.log('Error in retrieving Categoria list :' + err);
      }
  }).lean();}).lean();
   
  };

  export const renderedit = async (req, res) => {
    const produ = await Producto.findById(req.params.id).lean();
    res.render("adminpro/editpro", { produ });
};