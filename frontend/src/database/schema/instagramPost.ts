import mongoose from "mongoose";

export type Shape = {
    _id: string;
    name?: string;
    shape: "rectangle" | "circle" | "picture";
    data: {
        x: number;
        y: number;
        width?: number;
        height?: number;
        radius?: number;
        src?: string;
        color: string;
    }

}

const shapeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    shape: {
        type: String,
        required: true
    },
    data: {
        x: Number,
        y: Number,
        width: {
            type: Number,
            required: false
        },
        height: {
            type: Number,
            required: false
        },
        radius: {
            type: Number,
            required: false
        },
        src: {
            type: String,
            required: false
        },
        color: String
    }
});

export interface IInstagramPost {
    _id: string;
    name: string;
    brandId: string;
    shapes: Shape[];

    save: () => Promise<void>;
}

const InstagramPostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true
    },
    shapes: {
        type: [shapeSchema],
        default: []
    }
});

const InstagramPost =
    mongoose.models.InstagramPost ||
    mongoose.model("InstagramPost", InstagramPostSchema);
export default InstagramPost;