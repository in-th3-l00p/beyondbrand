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