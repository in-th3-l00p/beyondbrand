import React, {useContext, useState} from "react";
import TabContext from "@/app/brands/[id]/components/tabs/TabContext/TabContext";
import Modal, {modalFooter} from "@/components/Modal";
import UploadRegion from "@/components/logo/UploadRegion";
import Loading from "@/app/brands/create/components/Loading";

export function UploadLogoModal({show, setShow}: {
    show: boolean;
    setShow: (show: boolean) => void;
}) {
    const {brand, setBrand} = useContext(TabContext);
    const [logo, setLogo] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <Modal
            title={"Upload logo"}
            show={show}
            setShow={setShow}
        >
            {loading ? (
                <Loading />
            ): (
                <UploadRegion b64Logo={logo} setB64Logo={setLogo}/>
            )}

            <div className={modalFooter()}>
                <button
                    className={"btn btn-primary"}
                    onClick={() => {
                        setLoading(true);
                        fetch("/api/brands", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                _id: brand._id,
                                logo
                            })
                        })
                            .then((res) => res.json())
                            .then((brand) => {
                                setBrand(brand);
                                setLogo("");
                                setShow(false);
                            })
                            .finally(() => setLoading(false));
                    }}
                    disabled={!logo || loading}
                >
                    Upload
                </button>
            </div>
        </Modal>
    );
}