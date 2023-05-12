import * as React from "react";
import EditChipWithLabel from "../Chip/EditChipWithLabel";
import {gql, QueryResult, useMutation} from "@apollo/client";
import toast from "react-hot-toast";
import {Proposal, Proposal_Status} from "../../types/resolvers";
import {Modal, ModalDialog} from "@mui/joy";
import EditProposalForm from "../Forms/EditProposalForm";
import CancelChipWithLabel from "../Chip/CancelChipWithLabel";


export function EditCancelProposalControlButtons(props: {
    proposal: Proposal
    setProposals: React.Dispatch<React.SetStateAction<Proposal[]>>
}) {
    const [open, setOpen] = React.useState<boolean>(false);
    // todo remove the canceld proposal from the ui

    const CANCEL_PROPOSAL = gql`
        mutation EditProposal($cancelProposalId: ObjectID!) {
            cancelProposal(id: $cancelProposalId) {
                _id
                status
            }
        }
    `
    const [cancelProposal, {error}] = useMutation<{ cancelProposal: QueryResult }>(CANCEL_PROPOSAL,
        {
            variables: {
                cancelProposalId: props.proposal._id
            }
        })

    const cancelProposalHandler = async () => {
        const confirmation = confirm("Are you sure you want to cancel this proposal ")
        if (confirmation) {
            await toast.promise(
                cancelProposal(),
                {
                    loading: 'Canceling...',
                    success: <b>Proposal Cancelled successfully!</b>,
                    error: <b>Could not save. {error?.message}</b>,
                }
            ).finally(() => {
                props.setProposals(prev => prev.map((proposal) => proposal._id !== props.proposal._id.toString() ? proposal : {
                    ...proposal,
                    status: Proposal_Status.Canceled
                }))
            })
        }
    }

    const editeProposalHandler = (proposal: Proposal) => {

        setOpen(false);
        props.setProposals(prv => prv.map(prp => prp._id === proposal._id ? proposal : prp))
    }


    return <>
        <EditChipWithLabel clickHandler={() => setOpen(true)}/>
        <CancelChipWithLabel actionHandler={cancelProposalHandler}/>
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog
                aria-labelledby="basic-modal-dialog-title"
                aria-describedby="basic-modal-dialog-description"
                sx={{width: "50%"}}
            >
                <EditProposalForm onSubmitProposalHandler={editeProposalHandler} proposal={props.proposal}/>

            </ModalDialog>
        </Modal>
    </>;
}