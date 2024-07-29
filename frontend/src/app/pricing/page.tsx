import {pageContainer} from "@/components/primitives";
import clsx from "clsx";

import {Pricing} from "@/components/pricing";


export default function Page() {
    return (
        <section className={clsx(pageContainer())}>
            <Pricing page={true}/>
        </section>
    )
}