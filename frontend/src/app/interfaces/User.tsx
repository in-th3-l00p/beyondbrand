import Business from "@/app/interfaces/Business";

export default interface User {
        id: number;
        name: string;
        email: string;
        image: string;
        business: Business
}