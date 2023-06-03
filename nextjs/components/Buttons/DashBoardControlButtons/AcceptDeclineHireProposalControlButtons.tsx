import * as React from "react";
import {gql, QueryResult, useMutation} from "@apollo/client";
import toast from "react-hot-toast";
import {Contract, Proposal, Proposal_Status} from "../../../types/resolvers";
import CancelChip from "../../Chip/CancelChip";
import AcceptChip from "../../Chip/AcceptChip";
import HireChip from "../../Chip/HireChip";
import {Modal, ModalClose, ModalDialog} from "@mui/joy";
import CreateContractForm from "../../Forms/wrappers/CreateContractForm";


export function AcceptDeclineHireProposalControlButtons(props: {
    proposal: Proposal
    setProposals: React.Dispatch<React.SetStateAction<Proposal[]>>
    setContracts: React.Dispatch<React.SetStateAction<Contract[]>>
    proposal_status: Proposal_Status

}) {
    const [open, setOpen] = React.useState<boolean>(false);

    const DECLINE_PROPOSAL = gql`
        mutation DeclineProposal($declineProposalId: ObjectID!) {
            declineProposal(id: $declineProposalId) {
                _id
            }
        }
    `
    const ACCEPET_PROPOSAL = gql`
        mutation AcceptProposal($acceptProposalId: ObjectID!) {
            acceptProposal(id: $acceptProposalId) {
                _id
            }
        }`

    const [declineProposal, {error: declineError}] = useMutation<{ declineProposal: QueryResult }>(DECLINE_PROPOSAL,
        {
            variables: {
                declineProposalId: props.proposal._id
            }
        })
    const [acceptProposal, {error: acceptError}] = useMutation<{ ACCEPT_PROPOSAL: QueryResult }>(ACCEPET_PROPOSAL,
        {
            variables: {
                acceptProposalId: props.proposal._id
            }
        })

    const declineProposalHandler = async () => {
        const confirmation = confirm("Are you sure you want to cancel this proposal ")
        if (confirmation) {
            await toast.promise(
                declineProposal(),
                {
                    loading: 'Declining...',
                    success: <b>Proposal has been Declined successfully!</b>,
                    error: <b>Could not save. {declineError?.message}</b>,
                }
            ).then(() => {
                props.setProposals(prev => prev.map((proposal) => proposal._id !== props.proposal._id.toString() ? proposal : {
                    ...proposal,
                    status: Proposal_Status.Declined
                }))
            }).catch((e) => console.error(e))
        }
    }
    const acceptProposalHandler = async () => {
        const confirmation = confirm("Are you sure you want to Accept this proposal ")
        if (confirmation) {
            await toast.promise(
                acceptProposal(),
                {
                    loading: 'Accepting...',
                    success: <b>Proposal has been Accepted successfully!</b>,
                    error: <b>Could not save. {acceptError?.message}</b>,
                }
            ).then(() => {
                props.setProposals(prev => prev.map((proposal) => proposal._id !== props.proposal._id.toString() ? proposal : {
                    ...proposal,
                    status: Proposal_Status.Approved
                }))
            }).catch((e) => console.error(e))
        }
    }

    const createContractHandler = function (contract: Contract) {
        setOpen(false)
        props.setContracts(prv => [...prv, contract])

    }

    return <>
        {/*&& proposal.status === (Proposal_Status.InProgress || Proposal_Status.Completed)*/}
        {props.proposal_status === Proposal_Status.InProgress &&
            <>
                <CancelChip label={"decline"} actionHandler={declineProposalHandler}/>
                <AcceptChip actionHandler={acceptProposalHandler}/>
            </>
        }

        {props.proposal.status === Proposal_Status.Approved && <HireChip actionHandler={() => setOpen(true)}/>}

        <Modal open={open} onClose={() => setOpen(false)}>

            <ModalDialog
                aria-labelledby="basic-modal-dialog-title"
                aria-describedby="basic-modal-dialog-description"
                sx={{minWidth: "50%", overflowY: "auto"}}
            >
                <ModalClose/>
                <CreateContractForm
                    proposal={props.proposal}
                    onSubmitContractHandler={createContractHandler}

                />

            </ModalDialog>
        </Modal>

    </>;
}