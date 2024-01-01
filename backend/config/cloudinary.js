import cloudinary from "cloudinary"
import { CLOUDINART_API_KEY, CLOUDINART_API_SECRET, CLOUDINART_CLOULD_NAME } from "./config.js"


cloudinary.v2.config({
    cloud_name : CLOUDINART_CLOULD_NAME,
    api_key : CLOUDINART_API_KEY,
    api_secret :CLOUDINART_API_SECRET
})


export default cloudinary.v2