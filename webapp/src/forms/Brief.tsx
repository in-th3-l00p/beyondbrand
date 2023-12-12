import React from "react";

interface BriefProps {
    setBrief: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Brief: React.FC<BriefProps> = ({ setBrief }) => {
    return (
        <form
            className={
                "flex flex-col gap-5 items-center px-2"
            }
            onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                setBrief(data.get("brief")! as string);
            }}
        >
            <h1 className={"text-2xl font-bold"}>
                Tell us something about your business
            </h1>
            <textarea
                name="brief"
                id="brief"
                rows={10}
                className={"input"}
            />

            <button type="submit" className={"btn"}>
                Next
            </button>
        </form>
    );
}

export default Brief;