import React, {useState} from "react";
import Brief from "../forms/Brief";
import Name from "../forms/Name";

const Form = () => {
    const [brief, setBrief] = React.useState<string>();
    const [name, setName] = useState<string>();

    return (
        <section className={"max-w-2xl mx-auto"}>
            <img
                src="/logo.png"
                alt="logo"
                className={"sm:w-1/2 w-full mx-auto"}
            />

            {brief && !name && (
                <Name
                    brief={brief}
                    setName={setName}
                />
            )}
            {!brief && (
                <Brief
                    setBrief={setBrief}
                />
            )}
        </section>
    );
}

export default Form;