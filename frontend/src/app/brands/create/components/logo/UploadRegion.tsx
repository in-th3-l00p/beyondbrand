import {useDropzone} from "react-dropzone";
import React from "react";
import "./uploadRegion.scss";
import Image from "next/image";

export default function UploadRegion() {
    const FILE_SIZE = 1024 * 1024 * 2; // 2MB
    const PREVIEW_SIZE = 100; // in px
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        maxFiles: 1,
        maxSize: FILE_SIZE,
        accept: {
            "images": [ "images/*" ]
        }
    });
    const [fileReader, setFileReader] = React.useState<FileReader | null>(null);

    React.useEffect(() => {
        if (!acceptedFiles.length)
            return;
        const reader = new FileReader();
        reader.onload = () => setFileReader(reader);
        reader.onerror = () => console.error("Error reading file");
        reader.readAsDataURL(acceptedFiles[0]);
    }, [acceptedFiles]);

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps({  })} />
                <h2 className={"text-lg"}>Drag your logo here, or click to select it</h2>
                <p>Max file size: {FILE_SIZE / (1024 * 1024)} MB</p>
            </div>
            {acceptedFiles.length > 0 && (
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

                    <p>Uploaded: {acceptedFiles[0].name}</p>
                </div>

            )}
        </section>
    );
}