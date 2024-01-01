import express from "express"
import { createPost } from "../controller/postController.js";
import { authenticate } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";
const postRouter = express.Router();


postRouter.post("/create-post" , authenticate, upload.single("image"), createPost)


export default postRouter