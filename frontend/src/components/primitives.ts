import {tv} from "tailwind-variants";

export const button = tv({
    base:
        `px-8 py-2 bg-jet rounded-md shadow-md
        text-lg text-white
        disabled:cursor-not-allowed 
        enabled:hover:shadow-xl 
        enabled:hover:bg-dark-gray 
        focus:bg-dark-gray
        focus:outline-none
        transition-all`,
    variants: {
        type: {
            primary: `bg-cyan enabled:hover:!bg-dark-cyan focus:bg-dark-cyan`,
            danger: `bg-tomato enabled:hover:!bg-dark-tomato focus:bg-dark-tomato`
        }
    }
});

export const input = tv({
    base:
        `mt-1 block w-full px-3 py-2
        border border-jet rounded-md shadow-md
        focus:outline-none focus:ring-cyan focus:border-cyan`
});

export const pageContainer = tv({
    base: "container mx-auto px-4 lg:px-8 2xl:px-16 py-8",
    variants: {
        layout: {
            create: "flex-grow flex flex-col"
        }
    }
});