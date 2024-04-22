import {useDropzone} from "react-dropzone";
import React, {useContext, useEffect} from "react";
import "./uploadRegion.scss";
import Image from "next/image";
import BrandContext from "@/app/brands/create/BrandContext";
import mime from "mime-types";

export default function UploadRegion() {
    const FILE_SIZE = 1024 * 1024 * 2; // 2MB
    const PREVIEW_SIZE = 100; // in px
    const { logo, setLogo } = useContext(BrandContext);
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

    // if a file is uploaded, read it as a base64 string and save it to the logo state
    useEffect(() => {
        if (!acceptedFiles.length || !setLogo)
            return;
        setFile(acceptedFiles[0]);

        const bufferReader = new FileReader();
        bufferReader.onload = () => {
            const buffer = bufferReader.result as ArrayBuffer;
            const bytes = new Uint8Array(buffer);
            let base64 = "";
            for (let i = 0; i < bytes.length; i++)
                base64 += String.fromCharCode(bytes[i]);
            base64 = btoa(base64);
            setLogo(`data:${acceptedFiles[0].type};base64,${base64}`);
        };
        bufferReader.onerror = () => console.error("Error reading file");
        bufferReader.readAsArrayBuffer(acceptedFiles[0]);

        return () => {
            bufferReader.onload = null;
            bufferReader.onerror = null;
        }
    }, [acceptedFiles, setLogo]);

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

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps({  })} />
                <h2 className={"text-lg"}>Drag your logo here, or click to select it</h2>
                <p>Max file size: {FILE_SIZE / (1024 * 1024)} MB</p>
            </div>
            {file && (
                <div className={"w-full text-center flex flex-col items-center"}>
                    <p>Preview:</p>
                    {fileReader ? (
                        <Image
                            src={fileReader.result as string} alt={"Logo preview"}
                            width={PREVIEW_SIZE}
                            height={PREVIEW_SIZE}
                            className={"border mb-4 rounded-md p-2"}
                        />
                    ): (
                        <div className={
                            `border mb-4 w-[${PREVIEW_SIZE}px] h-[${PREVIEW_SIZE}px] p-2 rounded-md ` +
                            "flex justify-center items-center"
                        }>
                            <p>Loading...</p>
                        </div>
                    )}

                    <p>Uploaded: {file.name}</p>
                </div>
            )}
        </section>
    );
}