import {IBrand} from "@/database/schema/brand";
import {createContext} from "react";

interface IBrandContext {
    brand: IBrand;
    setBrand: (brand: IBrand) => void;
}

const BrandContext = createContext({} as IBrandContext);
export default BrandContext;