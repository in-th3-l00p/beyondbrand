import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false
    },
    subscription: {
        type: String,
        enum: ['free', 'pro', 'business'],
        required: true,
        default: 'free',
    }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;