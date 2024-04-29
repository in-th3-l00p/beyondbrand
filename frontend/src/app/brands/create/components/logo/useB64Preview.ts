import React, {useContext, useEffect, useState} from "react";
import BrandContext from "@/app/brands/create/BrandContext";
import mime from "mime-types";

export default function useB64Preview() {
    const { logo , setLogo } = useContext(BrandContext);
    const [file, setFile] = React.useState<File | null>(null);
    const [fileReader, setFileReader] = React.useState<FileReader | null>(null);

    // if base64 is set inside the logo string, create the file object based on it
    useEffect(() => {
        if (!logo || !setLogo)
            return;
        try {
            const logoParts = logo.split(",");
            const base64 = logoParts[1];
            const byteCharacters = atob(base64);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++)
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            const byteArray = new Uint8Array(byteNumbers);
            const mimeType = logoParts[0].split(":")[1];
            setFile(
                new File([byteArray],
                    "logo." + mime.extension(mimeType),
                    {type: mimeType})
            );
        } catch (e) {
            setLogo("");
        }
    }, [logo, setLogo]);

    // read 4 preview
    useEffect(() => {
        if (!file || !setLogo)
            return;
        const urlReader = new FileReader();
        urlReader.onload = () => setFileReader(urlReader);
        urlReader.onerror = () => console.error("Error reading file");
        urlReader.readAsDataURL(file);

        return () => {
            urlReader.onload = null;
            urlReader.onerror = null;
        }
    }, [file, setLogo]);


    return {file, fileReader};
}