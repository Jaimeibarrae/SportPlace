
import { Schema, model } from "mongoose";

const CategoriaSchema = new Schema(
  {
    namecategoria: { type: String, trim: true },
    Estado: {type: Boolean, default:false}
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Categoria", CategoriaSchema);