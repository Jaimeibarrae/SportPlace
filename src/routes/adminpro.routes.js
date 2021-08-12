import { Router } from "express";
import {
listpro,
agregarcategoria,
eliminarcategoria,
eliminarproducto,
renderedit,
subirproduct,
updateProducto,
} from "../controllers/adminpro.controller";



const router = Router();

// Routes
router.get("/adminpro/listpro", listpro);
router.post("/addProduct", agregarcategoria);
router.delete("/deletep/:id", eliminarproducto);
router.delete("/deletec/:id", eliminarcategoria);
router.post('/upload',subirproduct);
router.post("/editarprodu/:id", updateProducto);

    
router.get("/adminpro/editpros/:id", renderedit);
export default router;
