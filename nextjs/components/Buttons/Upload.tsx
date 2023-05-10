import React, {
  Dispatch,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import uploadFileToBlob from "../../utils/azure-storage-blob";
import DisplayImagesFromContainer from "../ContainerImage";
import Link from "next/link";

const Upload = (props: {
  onUpload: Dispatch<React.SetStateAction<string>>;
}): JSX.Element => {
  // // all blobs in container
  const [blobList, setBlobList] = useState<string[]>([]);
  //
  // // current file to upload into container
  const [fileSelected, setFileSelected] = useState<File | null>();
  const [fileUploaded, setFileUploaded] = useState<string>("");
  //
  // // UI/form management
  const [uploading, setUploading] = useState<boolean>(false);
  const [inputKey, setInputKey] = useState(Math.random().toString(36));

  //
  // *** GET FILES IN CONTAINER ***
  //   useEffect(() => {

  //     getBlobsInContainer().then((list: any) => {
  //       // prepare UI for results`
  //       setBlobList(list);
  //     });
  //   }, [fileUploaded]);
  //
  const onFileChange = (event: any) => {
    // capture file into state
    console.log("File uploaded : ", event.target.files[0]);

    setFileSelected(event.target.files[0]);
  };

  const onFileUpload = async () => {
    if (fileSelected && fileSelected?.name) {
      // prepare UI
      setUploading(true);

      // *** UPLOAD TO AZURE STORAGE ***
      await uploadFileToBlob(fileSelected);

      // reset state/form
      setFileSelected(null);
      setFileUploaded(fileSelected.name);
      setUploading(false);
      setInputKey(Math.random().toString(36));

      props.onUpload(fileSelected.name);

      //   imageRef.current = JSON.stringify(urlImage);
      //   console.log("imageRef", imageRef.current);
    }
  };

  {
    /* <Link component="button" overlay>
          Click to upload
        </Link>{' '}
        or drag and drop
        <br /> SVG, PNG, JPG or GIF (max. 800x400px) */
  }

  // display form
  const DisplayForm = () => (
    <div>
      <input type="file" onChange={onFileChange} key={inputKey || ""} />
      <button component="button" overlay type="submit" onClick={onFileUpload}>
        Click to upload
      </button>
    </div>
  );

  return (
    <div>
      {/* <h1>Upload file to Azure Blob Storage</h1> */}
      {!uploading && <DisplayForm />}
      {uploading && <div>Uploading</div>}
    </div>
  );
};

export default Upload;
