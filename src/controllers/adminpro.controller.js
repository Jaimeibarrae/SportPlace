
import Categoria from "../models/Categoria";
import Producto from "../models/Adminproduct";

export const listpro =  async (req, res) => {

  
Categoria.find((err, docs) => {
        if (!err) {
            res.render("adminpro/listpro", {
                list: docs,
            });
        }
        else {
            console.log('Error in retrieving Categoria list :' + err);
        }
    }).lean();   

 
};

export const list =  async (req, res) => {
  Producto.find((err, docs) => {
      if (!err) {
          res.render("adminpro/listpro", {
              produlist: docs,
          });
      }
      else {
          console.log('Error in retrieving Categoria list :' + err);
      }
  }).lean();   

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
    const {id} = req.params;
    await  Categoria.remove({_id: id});
    req.flash("success_msg", "La Categoria se elimino correctamente");
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
    producto.estado = req.body.estado
    producto.size = req.file.size;
    producto.Categoria = req.body.Categoria;
    producto.cantidad = req.body.cantidad;

    await producto.save();
    req.flash("success_msg", "El producto se guardo exitosamente");
    res.redirect("adminpro/listpro");
  };

  export const editpro = async (req, res) => {
    res.render("/editpro");
  }