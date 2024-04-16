import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI!)
    .then(() => {});

export default mongoose;