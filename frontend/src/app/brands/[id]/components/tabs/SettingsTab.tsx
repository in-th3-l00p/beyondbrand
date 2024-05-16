import {panel, panelContainer, panelTitle} from "@/app/brands/[id]/components/components";
import {button, input} from "@/components/primitives";
import {useContext, useState} from "react";
import {useRouter} from "next/navigation";
import BrandContext from "@/app/brands/[id]/components/BrandContext/BrandContext";

export default function SettingsTab() {
    const router = useRouter();
    const { brand } = useContext(BrandContext);
    const [confirmation, setConfirmation] = useState<string>("");

    return (
        <div className={panelContainer()}>
            <div className={panel() + " col-span-2"}>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div>
                        <h2 className={panelTitle()}>Delete brand</h2>
                        <p>Are you sure you want to proceed with this action?</p>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                    }}>
                        <label htmlFor="confirmation">Write the name of the brand to proceed:</label>
                        <input
                            type="text" className={input() + " mb-4"}
                            id={"confirmation"} name={"confirmation"}
                            value={confirmation}
                            onChange={(e) => setConfirmation(e.target.value)}
                        />

                        <button
                            type={"submit"}
                            disabled={confirmation !== brand.name}
                            className={button()}
                            onClick={() => {
                                fetch("/api/brands?_id=" + brand._id, {
                                    method: "DELETE",
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                })
                                    .then(() => router.push("/"));
                            }}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}