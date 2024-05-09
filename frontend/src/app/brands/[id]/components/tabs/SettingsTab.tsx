import {panel, panelContainer, panelTitle} from "@/app/brands/[id]/components/components";
import {button, input} from "@/components/defaults";
import {useContext, useState} from "react";
import BrandDisplayContext from "@/app/brands/[id]/components/BrandDisplayContext/BrandDisplayContext";

export default function SettingsTab() {
    const { brand } = useContext(BrandDisplayContext);
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
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}