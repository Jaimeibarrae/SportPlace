
import Product from "../models/Adminproduct";


export const ProductController = async (req, res) => {

    Product.find((err, docs) => {
        if(!err){
            res.render("Products/product",{
                product: docs,
            });
        }
        else
        {
            console.log('Error:'+ err)
        }
    }).lean();
};