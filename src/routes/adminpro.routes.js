import { Router } from "express";
import {
listpro,
agregarcategoria,
eliminarcategoria,
subirproduct,
list,
editpro,
mostrarcategorias
} from "../controllers/adminpro.controller";
import Categoria from "../models/Categoria";


const router = Router();

// Routes
router.get("/adminpro/listpro", list);
router.get('/adminpro/listpro', listpro);
//router.get("/adminpro/listpro",  mostrarcategorias);

router.post("/addProduct", agregarcategoria);

router.get("/deleteProduct/:id", eliminarcategoria);
router.post('/upload',subirproduct);
router.put('/editpro', editpro);
export default router;
