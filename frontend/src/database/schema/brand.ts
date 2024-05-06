import mongoose, {Types} from "mongoose";

export interface IBrand {
    _id: Types.ObjectId;
    name: string;
    description: string;
    colors: string[];
    logo: string;
    website?: string;
    owner: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    colors: [{
        type: String,
        required: true,
        length: 7
    }],
    website: {
        type: String,
        required: false
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: false
    },
})

const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);
export default Brand;
