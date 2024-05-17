import mongoose from "mongoose";

export type Shape = {
    shape: "rectangle" | "circle";
    data: {
        x: number;
        y: number;
        width: number;
        height: number;
    } | {
        x: number;
        y: number;
        radius: number;
    };
}

const shapeSchema = new mongoose.Schema({
    shape: {
        type: String,
        required: true
    },
    data: {
        type: mongoose.SchemaTypes.Mixed,
        required: true
    }
});

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
    },
    shapes: [shapeSchema]
});

const InstagramPost =
    mongoose.models.InstagramPost ||
    mongoose.model("InstagramPost", InstagramPostSchema);
export default InstagramPost;