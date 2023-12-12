import React from "react";

interface CenterProps {
    children?: React.ReactNode;
}

const Center: React.FC<CenterProps> = ({ children }) => {
    return (
        <section
            className={
                "w-screen h-screen flex justify-center items-center " +
                "bg-dark-slate text-white"
            }
        >
            <div className={"w-full"}>
                {children}
            </div>
        </section>
    );
}

export default Center;