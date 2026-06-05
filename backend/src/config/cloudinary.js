import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

cloudinary.config(true);

console.log(cloudinary.config());

export default cloudinary;