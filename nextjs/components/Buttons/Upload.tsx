import React, {ChangeEvent, Dispatch, useState} from "react";
import uploadFilesToBlob from "../../utils/azure-storage-blob";
import Button from "@mui/joy/Button";
import {Stack} from "@mui/joy";
import toast from "react-hot-toast";

const Upload = (props: {
    uploadHandler: Dispatch<React.SetStateAction<string>>;
}) => {

    // // current file to upload into container
    const [fileSelected, setFileSelected] = useState<File | null>();

    //
    // // UI/form management
    const [uploading, setUploading] = useState<boolean>(false);
    const [inputKey, setInputKey] = useState(Math.random().toString(36));

    //
    // *** GET FILES IN CONTAINER ***

    const onFileChange = (event: ChangeEvent<HTMLInputElement> | undefined) => {
        if (!event || !event.target.files) return;

        if (event.target.files[0].size > 2097152) {
            toast.error("File is too big!");
            event.target.value = "";
        }
        // file.name=fileName;
        setFileSelected(event.target.files[0]);
    };

    const onFileUpload = async () => {
        if (fileSelected && fileSelected?.name) {
            // prepare UI
            setUploading(true);

            // *** UPLOAD TO AZURE STORAGE ***
            const fileUrls = await uploadFilesToBlob([fileSelected]);
            // reset stateform
            setFileSelected(null);
            setUploading(false);
            setInputKey(Math.random().toString(36));
            props.uploadHandler(fileUrls[0].url);

        }
    };


    const DisplayForm = () => (
        <div style={{display: "flex", flexDirection: "column", gap: "10px", padding: "10px"}}>
            <input
                type="file"
                onChange={onFileChange}
                key={inputKey}
                style={{display: "none"}}
                id="file-input"
            />
            <label htmlFor="file-input" style={{cursor: "pointer"}}>
                <Button
                    component="span"
                    // sx={{width: "150px", height: "40px", padding: "10px"}}
                >
                    Choose File
                </Button>
            </label>
            <Button
                color="primary"
                disabled={!fileSelected}
                onClick={onFileUpload}
                // sx={{width: "150px", height: "40px", padding: "10px"}}
            >
                Upload
            </Button>
        </div>
    );

    return (
        <Stack
            sx={{
                width: "100%",
                height: "5rem",
                alignItems: "center",
                justifyContent: "center"
                // backgroundColor: "red"
            }}>
            {!uploading && <DisplayForm/>}
            {uploading && <div>Uploading</div>}
        </Stack>
    );
};

export default Upload;
