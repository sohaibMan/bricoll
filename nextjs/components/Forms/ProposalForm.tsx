import {DocumentNode, useMutation} from "@apollo/client";
import Box from "@mui/joy/Box";
import * as React from "react";
import {FormEvent, useState} from "react";
import Textarea from '@mui/joy/Textarea';
import {Stack} from "@mui/joy";
import Button from "@mui/joy/Button";
import toast from "react-hot-toast";
import {MutationCreateProposalArgs, MutationEditProposalArgs, Proposal, Proposal_Status} from "../../types/resolvers";
import {DurationInput} from "../Inputs/DurationInput";
import {PriceInput} from "../Inputs/PriceInput";
import Typography from "@mui/joy/Typography";


// TODO - ADD OTHER FIELDS AND CUSTOMIZE THE FUNCTION


export default function ProposalForm(props: {
    onSubmitProposalHandler: (proposal: Proposal) => void,
    project_id: string,
    PROPOSAL_MUTATION: DocumentNode,
    proposal?: Proposal,
    label: string
}) {


    const defaultState = {
        price: props.proposal?.price.toString() || "",
        duration: props.proposal?.duration.toString() || "",
        description: props.proposal?.description || "",
        coverLetter: props.proposal?.cover_letter || "",
    }

    const [createProposal, {data, loading, error}] = useMutation(props.PROPOSAL_MUTATION);
    const [price, setPrice] = useState<string>(defaultState.price);
    const [duration, setDuration] = useState<string>(defaultState.duration);
    const [description, setDescription] = useState<string>(defaultState.description);
    const [coverLetter, setCoverLetter] = useState<string>(defaultState.coverLetter);
    const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (+price <= 0) return toast.error("Price can't be negative")
        if (+duration <= 0 || +duration >= 90) return toast.error("Duration should be between 1 and 90 days")
        if (+description.length >= 10000 || +description.length <= 5) return toast.error("Description should be between 5 and 1000")
        if (+coverLetter.length >= 10000 || +coverLetter.length <= 5) return toast.error("Cover Letter should be between 5 and 1000")
        const mutationCreateProposalArgs: MutationCreateProposalArgs | MutationEditProposalArgs = {
            id: props.proposal?._id, // needed in the edit proposals only
            project_id: props.project_id, // needed in the created project and the edit project
            price: +price,
            duration: +duration,
            cover_letter: coverLetter,
            description
        }
        try {
            toast.promise(
                createProposal({
                    variables: mutationCreateProposalArgs
                }),
                {
                    loading: 'Saving...',
                    success: <b>Form submitted!</b>,
                    error: <b>{error?.message}</b>,
                }
            ).then((data: any) => {
                // console.log(data)
                // data.editProposal._id    // the id of the edited proposal
                const editedProposal = {
                    _id: props.proposal?._id || data?.editProposal?._id,
                    duration: +duration,
                    price: +price,
                    description,
                    cover_letter: coverLetter,
                    status: data?.editProposal?.status || props.proposal?.status || Proposal_Status.InProgress
                } as Proposal // it miss some fields but it's ok i won't use them in the edit proposal
                // setPrice("")
                // setDuration("")
                // setDescription("")
                // setCoverLetter("")
                props.onSubmitProposalHandler(editedProposal)
            })

        } catch (e) {
            console.error(e)
        }
        // toast.success("Hello World")
    }


    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <Box
            sx={{
                width: "100%",
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
                    {props.label && <Typography level="h4">{props.label}</Typography>}

                    <Stack spacing={2} direction="row">

                        <PriceInput value={price} onChange={(e) => setPrice(() => e.target.value)}/>

                        <DurationInput value={duration} onChange={(e) => setDuration(() => e.target.value)}/>

                    </Stack>
                    <Textarea placeholder="description" value={description} required
                              onChange={(e) => setDescription(() => e.target.value)} minRows={2}/>

                    <Textarea placeholder="cover letter" value={coverLetter} required
                              onChange={(e) => setCoverLetter(() => e.target.value)} minRows={4}/>


                    <Button type=" submit"> Submit</Button>

                </Stack>


            </form>

        </Box>
    )
        ;
}