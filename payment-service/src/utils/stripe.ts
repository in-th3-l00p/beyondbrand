import Stripe from "stripe";

let stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default stripe;