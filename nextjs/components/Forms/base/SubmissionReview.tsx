import {DocumentNode, useMutation} from "@apollo/client";
import {FormEvent, useState} from "react";
import Textarea from '@mui/joy/Textarea';
import {Stack} from "@mui/joy";
import Button from "@mui/joy/Button";
import toast from "react-hot-toast";

import {Contract,} from "../../../types/resolvers";
import Typography from '@mui/joy/Typography';
import FileUploadIcon from "@mui/icons-material/FileUpload";
import uploadFilesToBlob from "../../../utils/azure-storage-blob";
import {useEditor} from "@tiptap/react";
import {EditableRichTextEditor, RichTextEditorExtensions} from "../../RichTextEditor/EditableRichTextEditor";
import {Skeleton} from "@mui/material";


export default function SubmissionReview(props: {
    // submissionReview?: Submission_Review,
    currentContract: Contract,
    REQUEST_PROJECT_SUBMISSION_REVIEW_MUTATION: DocumentNode,
    onSubmissionReview: () => void
    label: string
}) {


    const defaultState = {
        title: "",
        description: "",
    }


    const [mutationSubmission, {error, loading}] = useMutation(props.REQUEST_PROJECT_SUBMISSION_REVIEW_MUTATION);
    const editor = useEditor({
        extensions: RichTextEditorExtensions("Enter your description"),
        content: defaultState.description
    });

    const [title, setTitle] = useState<string>(defaultState.title);
    const [uploadedFilesList, setUploadedFilesList] = useState<FileList | null>(null);
    const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (title.length >= 100 || title.length <= 5) return toast.error("Title should be between 5 and 1000")
        const editorLength = editor?.storage?.characterCount?.characters() || 0;
        if (editorLength <= 5) return toast.error("Description should be between 5 and 100000")
        if (uploadedFilesList && uploadedFilesList.length >= 6) return toast.error("You can't upload more than 5 files")


        const mutationSubmissionArgs = {
            contract_id: props.currentContract._id,
            title,
            description: JSON.stringify(editor?.getJSON()),
            attachments: []
        }

        if (uploadedFilesList) {
            await toast.promise((async () => {
                mutationSubmissionArgs.attachments = await uploadFilesToBlob(Array.from(uploadedFilesList))

            })(), {
                loading: 'Uploading your files...',
                success: <b>File uploaded !</b>,
                error: <b>Failed to upload files</b>,
            })
        }


        try {
            toast.promise(
                mutationSubmission({
                    variables: mutationSubmissionArgs
                }),
                {
                    loading: 'Saving...',
                    success: <b>Form submitted!</b>,
                    error: <b>{error?.message}</b>,
                }
            ).then(({}) => {


                // const editedsubmission = {
                //     submission: props.submission?._id || data.createsubmission._id,
                //     price: +price,
                //     title,
                //     description,
                // } as unknown as Submission_Review;

                props.onSubmissionReview()//to close the modal and update the ui

            })

        } catch (e) {
            console.error(e)
        }
    }


    return (

        <form onSubmit={handleSubmit} style={{width: "100%"}}>
            <Stack spacing={1} sx={{width: "100%"}}>
                {props.label && <Typography level="h4">{props.label}</Typography>}

                <Textarea placeholder="Title" defaultValue={defaultState.title} required maxRows={4}
                          onChange={(e) => setTitle(() => e.target.value)} minRows={2}/>


                {editor ? <EditableRichTextEditor editor={editor}/> :
                    <Skeleton variant="rounded" width={"100%"} height={200}/>}


                <Stack spacing={1} direction="row" justifyContent="space-between">
                    <Button
                        component="label"
                        color="neutral"

                    >
                        <input onChange={(e) => setUploadedFilesList(e.target.files)} hidden accept="*"
                               multiple
                               type="file"/>
                        Add attachments
                        <FileUploadIcon/>
                    </Button>

                    <Button disabled={loading} type="submit"> Submit</Button>
                </Stack>

            </Stack>


        </form>

    )

}