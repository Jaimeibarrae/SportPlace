// Read environment variables
import { config } from "dotenv";
config();

const configurations = {
  PORT: process.env.PORT || 3000,  
  MONGODB_URI: process.env.MONGODB_URI  || "mongodb+srv://admin:admin1@sportplace.1l7vj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  
};


export default configurations;
