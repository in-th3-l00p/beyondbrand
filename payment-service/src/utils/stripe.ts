import {loadStripe} from "@stripe/stripe-js";
import logger from "./logger";

let stripe;
export async function initializeStripe() {
    try {
        stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY!);
        logger.debug("Stripe initialized.");
    } catch (e) {
        logger.error("Error initializing Stripe: " + e + ".");
    }

}

export default stripe;