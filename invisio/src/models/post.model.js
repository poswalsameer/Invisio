import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

    content: {
        type: String,
        required: true,
        maxLength: 100
    },
    postImage: {
        type: String //CLOUDINARY URL
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

}, 
{ 
    timestamps: true 
})


const Post = mongoose.models.posts || mongoose.model("posts", postSchema);

export default Post;