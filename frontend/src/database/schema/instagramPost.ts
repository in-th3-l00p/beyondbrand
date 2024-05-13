import mongoose from "mongoose";

export interface IInstagramPost {
    _id: string;
    name: string;
    brandId: string;
}

const InstagramPostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brandId: {
        type: mongoose.Types.ObjectId,
        ref: "Brand",
        required: true
    }
});

const InstagramPost =
    mongoose.models.InstagramPost ||
    mongoose.model("InstagramPost", InstagramPostSchema);
export default InstagramPost;