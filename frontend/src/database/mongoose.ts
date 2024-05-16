import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI!)
    .catch((error) => {
        console.error("Error connecting to MongoDB: ", error);
    });

export default mongoose;