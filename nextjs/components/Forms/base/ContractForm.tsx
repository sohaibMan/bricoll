import {DocumentNode, useMutation} from "@apollo/client";
import Box from "@mui/joy/Box";
import * as React from "react";
import {FormEvent, useState} from "react";
import {Button, Stack} from "@mui/joy";
import toast from "react-hot-toast";
import {Contract, MutationCreateContractArgs, MutationEditContractArgs, Proposal} from "../../../types/resolvers";
import {DurationInput} from "../../Inputs/DurationInput";
import {PriceInput} from "../../Inputs/PriceInput";
import TermsAutocomplete from "../../AutoCompletes/TermsAutocomplete";
// TODO -COMPLETE OTHER IMPORTANT INTERACTIONS AND GET BACK TO HERE

// TODO - ADD OTHER FIELDS AND CUSTOMIZE THE FUNCTION
type MutationArgs = MutationCreateContractArgs | MutationEditContractArgs

export default function ContractForm(props: {
    proposal: Proposal
    CONTRACT_MUTATION: DocumentNode,
    contract?: Contract
    onSubmitContractHandler: (contract: Contract) => void
}) {

    //todo: remove the hardcoded values
    const defaultState = {
        price: props.contract?.price.toString() || "",
        duration: props.contract?.duration.toString() || "",
        terms: props.contract?.terms || [],
    }

    const [createContract, {data, loading, error}] = useMutation<{ createContract: Contract }>(props.CONTRACT_MUTATION);
    const [price, setPrice] = useState<string>(defaultState.price);
    const [duration, setDuration] = useState<string>(defaultState.duration);
    const [terms, setTerms] = useState<string[]>(defaultState.terms);


    const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (+price <= 0) return toast.error("Price can't be negative")
        if (+duration <= 0 || +duration >= 90) return toast.error("Duration should be between 1 and 90 days")
        if (terms.length == 0) return toast.error("You must have at least one term")
        const mutationCreateContractArgs: MutationCreateContractArgs | MutationEditContractArgs = {
            id: props.contract?._id, // needed in the edit contracts only
            // contract_id: props.contract_id // needed in the created Contract and the edit Contract
            price: +price,
            duration: +duration,
            freelancer_id: props.proposal.freelancer_id,
            project_id: props.proposal.project_id,
            proposal_id: props.proposal._id,
            terms
        }
        try {
            toast.promise(
                createContract({
                    variables: mutationCreateContractArgs
                }),
                {
                    loading: 'Saving...',
                    success: <b>Form submitted!</b>,
                    error: <b>{error?.message}</b>,
                }
            ).then(({data}) => {
                data?.createContract && props.onSubmitContractHandler(data?.createContract)
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
                    <Stack spacing={2} direction={"row"}>

                        <PriceInput value={price} onChange={(e) => setPrice(() => e.target.value)}/>

                        <DurationInput value={duration} onChange={(e) => setDuration(() => e.target.value)}/>


                    </Stack>
                    <TermsAutocomplete terms={terms} setTerms={setTerms}/>
                    <Stack spacing={2}>
                        <Button disabled={loading} type=" submit"> Submit</Button>

                    </Stack>

                </Stack>


            </form>

        </Box>
    )
        ;
}