import mongoose from "mongoose";

export type Shape = {
    _id: string;
    shape: "rectangle" | "circle";
    data: {
        x: number;
        y: number;
        width?: number;
        height?: number;
        radius?: number;
        color: string;
    }

}

const shapeSchema = new mongoose.Schema({
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