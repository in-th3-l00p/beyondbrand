import {useDropzone} from "react-dropzone";
import React, {useContext, useEffect} from "react";
import "./uploadRegion.scss";
import BrandContext from "@/app/brands/create/BrandContext";
import LogoPreview from "@/components/logo/LogoPreview";

export default function UploadRegion({ b64Logo, setB64Logo, noPreview }: {
    b64Logo?: string;
    setB64Logo?: (b64: string) => void
    noPreview?: boolean;
}) {
    const FILE_SIZE = 1024 * 1024 * 2; // 2MB
    const { setLogo } = useContext(BrandContext);
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        maxFiles: 1,
        maxSize: FILE_SIZE,
        accept: {
            "image/png": [ ".png" ],
            "image/jpeg": [ ".jpg", ".jpeg" ],
            "image/svg+xml": [ ".svg" ],
            "image/webp": [ ".webp" ]
        }
    });

    // if a file is uploaded, read it as a base64 string and save it to the logo state
    useEffect(() => {
        if (!acceptedFiles.length || !setLogo && !setB64Logo)
            return;

        const bufferReader = new FileReader();
        bufferReader.onload = () => {
            const buffer = bufferReader.result as ArrayBuffer;
            const bytes = new Uint8Array(buffer);
            let base64 = "";
            for (let i = 0; i < bytes.length; i++)
                base64 += String.fromCharCode(bytes[i]);
            base64 = btoa(base64);
            if (setB64Logo)
                setB64Logo(`data:${acceptedFiles[0].type};base64,${base64}`);
            else
                setLogo(`data:${acceptedFiles[0].type};base64,${base64}`);
        };
        bufferReader.onerror = () => console.error("Error reading file");
        bufferReader.readAsArrayBuffer(acceptedFiles[0]);

        return () => {
            bufferReader.onload = null;
            bufferReader.onerror = null;
        }
    }, [acceptedFiles, setLogo, setB64Logo]);

    return (
        <section className="uploadRegionContainer">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps({  })} />
                <h2 className={"text-lg"}>Drag your logo here, or click to select it</h2>
                <p>Max file size: {FILE_SIZE / (1024 * 1024)} MB</p>
            </div>

            {!noPreview && <LogoPreview logo={b64Logo} setLogo={setB64Logo} />}
        </section>
    );
}