import {gql, useMutation} from "@apollo/client";
import Box from "@mui/joy/Box";
import * as React from "react";
import {FormEvent, useState} from "react";
import Input from "@mui/joy/Input";
import Textarea from '@mui/joy/Textarea';
import {Stack} from "@mui/joy";
import Button from "@mui/joy/Button";
import toast from "react-hot-toast";


// TODO - ADD OTHER FIELDS AND CUSTOMIZE THE FUNCTION
const CREATE_PROPOSAL_MUTATION = gql`
    mutation CreateProposal($projectId: ObjectID!, $price: Float!, $duration: Int!, $description: String!, $coverLetter: String!) {
        createProposal(project_id: $projectId, price: $price, duration: $duration, description: $description, cover_letter: $coverLetter) {
            _id
        }
    }
`;


interface SubmitProposalFormProps {
    project_id: string
}

export default function SubmitProposalForm({project_id}: SubmitProposalFormProps) {
    const [createProposal, {data, loading, error}] = useMutation(CREATE_PROPOSAL_MUTATION);
    // if (error) toast.error(error.message);

    const [currency, setCurrency] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [duration, setDuration] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [coverLetter, setCoverLetter] = useState<string>("");
    const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (+price <= 0) return toast.error("Price can't be negative")
        if (+duration <= 0) return toast.error("Duration can't be negative")
        if (+description.length >= 10000 || +description.length <= 5) return toast.error("Description should be between 5 and 1000")
        if (+coverLetter.length >= 10000 || +coverLetter.length <= 5) return toast.error("Cover Letter should be between 5 and 1000")

        await toast.promise(
            createProposal({
                variables: {
                    projectId: project_id,
                    price: +price,
                    duration: +duration,
                    coverLetter,
                    description

                }
            }),
            {
                loading: 'Saving...',
                success: <b>Form submitted!</b>,
                error: <b>{error?.message}</b>,
            }
        );
        // toast.success("Hello World")
    }


    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <Box
            sx={{
                py: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'center',
                flexWrap: 'wrap',
            }}
        >

            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>

                    <Input
                        value={price}
                        onChange={(e) => setPrice(() => e.target.value)}
                        placeholder="Price"
                        startDecorator='$'
                        type="number"
                        required
                    />
                    <Input
                        value={duration}
                        onChange={(e) => setDuration(() => e.target.value)}
                        placeholder="Duration in days"
                        type="number"
                        required
                    />
                    <Textarea placeholder="description" value={description} required
                              onChange={(e) => setDescription(() => e.target.value)} minRows={2}/>
                    <Textarea placeholder="cover letter" value={coverLetter} required
                              onChange={(e) => setCoverLetter(() => e.target.value)} minRows={4}/>


                </Stack>


                <Button type=" submit"> Submit</Button>

            </form>

        </Box>
    )
        ;
}