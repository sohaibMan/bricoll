import * as React from "react";
import {gql, useMutation} from "@apollo/client";
import toast from "react-hot-toast";
import {Contract, Contract_Status} from "../../../types/resolvers";
import CancelChip from "../../Chip/CancelChip";
import PayButton from "../PayButton";


export function CancelPayContractControlButtons(props: {
    contract: Contract
    setContracts: React.Dispatch<React.SetStateAction<Contract[]>>
}) {

    const DECLINE_CONTRACT = gql`
        mutation DeclineContract($cancelContractId: ObjectID!) {
            cancelContract(id: $cancelContractId) {
                _id
                freelancer_id
                client_id
                project_id
                proposal_id
                price
                duration
                status
                created_at
                updated_at
                terms
                fees
            }
        }
    `

    const [cancelContract, {error: declineError}] = useMutation<{ cancelContract: Contract }>(DECLINE_CONTRACT,
        {
            variables: {
                cancelContractId: props.contract._id
            }
        })

    const cancelContractHandler = async () => {
        const confirmation = confirm("Are you sure you want to cancel this contract ")
        if (confirmation) {
            await toast.promise(
                cancelContract(),
                {
                    loading: 'Cancling...',
                    success: <b>Contract has been Declined successfully!</b>,
                    error: <b>Could not save. {declineError?.message}</b>,
                }
            ).then(({data}) => {
                // alert(JSON.stringify(data?.cancelContract))
                // props.setContracts( [data?.cancelContract || props.contract])
                props.setContracts(prevState => prevState.map((contract) => contract._id !== props.contract._id.toString() ? contract : data?.cancelContract || contract))
            }).catch((e) => console.error(e))
        }
    }


    return <>
        <CancelChip label={"cancel"} actionHandler={cancelContractHandler}/>
        {props.contract.status === Contract_Status.Accepted && <PayButton contract_id={props.contract._id}/>}
    </>;
}