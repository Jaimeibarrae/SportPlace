import { Router } from "express";
import { renderProducts,ProductController} from "../controllers/products.controller";

const router = Router();

router.get('/Products/product', ProductController);
export default router;
