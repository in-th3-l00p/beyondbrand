import {loadStripe} from "@stripe/stripe-js";
import Stripe from "stripe";
import logger from "./logger";

export let stripeJs: any;
export async function initializeStripeJs() {
    try {
        stripeJs = await loadStripe(process.env.STRIPE_PUBLIC_KEY!);
        logger.debug("Stripe initialized.");
    } catch (e) {
        logger.error("Error initializing Stripe: " + e + ".");
    }

}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export default stripe;