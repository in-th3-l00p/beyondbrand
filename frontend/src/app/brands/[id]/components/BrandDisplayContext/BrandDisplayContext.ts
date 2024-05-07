import {IBrand} from "@/database/schema/brand";
import React from "react";

export interface IBrandDisplayContext {
    brand: IBrand;
    setBrand: (brand: IBrand) => void;
}

const BrandDisplayContext = React.createContext<IBrandDisplayContext>(
    {} as IBrandDisplayContext
);

export default BrandDisplayContext;