import React from "react";

interface NameProps {
    brief: string;
    setName: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Name: React.FC<NameProps> = ({ brief, setName }) => {
    return (
        <form
            className={
                "flex flex-col gap-5 items-center px-2"
            }
            onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
            }}
        >
            <h1 className={"text-2xl font-bold"}>
                Tell us the name of your business.
            </h1>
            <h2 className={"text-xl"}>If you don't have one, press generate</h2>

            <input
                type="text"
                name="name"
                id="name"
                className={"input"}
            />

            <div className={"flex gap-5"}>
                <button
                    type="submit"
                    className={"btn"}
                >
                    Next
                </button>
                <button
                    type="button"
                    className={"btn"}
                >
                    Generate
                </button>
            </div>
        </form>
    );
}

export default Name;