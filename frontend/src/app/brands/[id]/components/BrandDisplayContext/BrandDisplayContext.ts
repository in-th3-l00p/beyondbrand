import {IBrand} from "@/database/schema/brand";
import React from "react";

export interface IBrandDisplayContext {
    brand: IBrand;
}

const BrandDisplayContext = React.createContext<IBrandDisplayContext>(
    {} as IBrandDisplayContext
);

export default BrandDisplayContext;