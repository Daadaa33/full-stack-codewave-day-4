import mullter from "multer"


const storage = mullter.memoryStorage()

const upload = mullter({
    storage : storage,
    limits : {
        fileSize : 5 * 1024 * 1024
    }
})


export default upload