import cloudinary from "../config/cloudinary.js";
import Post from "../models/post.js"


export const createPost = async(req, res) => {

    try{
    const currentUser = req.user._id
    const {title, content} = req.body

    let result ;

    if(req.file){
        let encodedImage = `data:image.jpeg;base64 ${req.file.buffer.toString("base64")}`
     
        result = await cloudinary.uploader.upload(encodedImage, {
            resource_type : "image",
            transformation : [{width : 500, height : 500, crop :"limit"}],
            encoding : "base64"

        })
        
    }

    const post = new Post({
        title : title,
        content : content,
        image : result?.url || null,
        author : currentUser
    })

await post.save()


res.status(201).send(post);

    }catch(error){

        console.log(error) 
        res.status(500).json({message: "Error creating post "}, error.message)

    }
}