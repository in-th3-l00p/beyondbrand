import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    auth0Id: {
        type: String,
        required: true,
    },
    customerId: {
        type: String,
        required: false,
    },
    subscriptionId: {
        type: String,
        required: false,
    }
});

const Customer = mongoose.model("Customer", CustomerSchema);

export default Customer;
